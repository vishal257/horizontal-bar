import { useEffect, useState } from "react";
import Theme from "./hooks/Theme";

interface DataSet{
  title: string
}

const HorizontalScroll = ({ url }: { url: string }) => {

  const [theme, setTheme] = Theme({key:'theme', defaultTheme:'light'});

  const toggleTheme = () => {
    setTheme(() => theme === 'light' ? 'dark' : 'light')
  }

  const [data, setData] = useState<DataSet[]|null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  async function dummyContent() {
    try {
      setLoading(true);
      setErrorMessage('');
      const response = await fetch(url);
      const result = await response.json();
      if(result && result.products && result.products.length > 0){
        setData(result.products);
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(String(error));
    }
  }

  const handleScroller = () => {
    const scrollTop = window.document.body.scrollTop || window.document.documentElement.scrollTop;
    const scrollableHeight =  window.document.documentElement.scrollHeight - window.document.documentElement.clientHeight;
    const percentage = (scrollTop / scrollableHeight) * 100; 
    setScrollPercentage(percentage);
  }

  useEffect(() => {
    dummyContent();
  }, [url]);

  useEffect(()=>{
    window.addEventListener('scroll', handleScroller);
    return () => window.removeEventListener('scroll', () => {})
  },[])


  if(errorMessage){
    return(
      <h1>An Error Occured</h1>
    )
  }

  return (
    <div className="container" data-theme={theme}>
    <div className="scroll-container">
      <div><h1>Scroll Trigger</h1></div>
      <div><button onClick={toggleTheme}>Change Theme</button></div>
      <div className="progress-gutter">
        <div className="progress-bar" style={{width: `${scrollPercentage}%`}}></div>
      </div>
    </div>
    <div className="content-container">
     {data && data.length > 0 && !loading ? data.map((ele, index) => <h3 key={index}>{ele.title}</h3>): <h1>Loading content</h1>}
    </div>
    </div>
  );
};

export default HorizontalScroll;
