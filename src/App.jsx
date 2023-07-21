import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Unity, useUnityContext } from "react-unity-webgl";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "./litbox.css";

function App() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/artGallery/Build/Builds.loader.js",
    dataUrl: "/artGallery/Build/Builds.data",
    frameworkUrl: "/artGallery/Build/Builds.framework.js",
    codeUrl: "/artGallery/Build/Builds.wasm",
  });

  const [imageUrl, setImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [header, setHeader] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    window.openModal = (url,header,details) => {      
        setImageUrl(url);
        setHeader(header);
        setDetails(details);
        setIsModalOpen(true);      
    };
    // Cleanup function to remove the global function when the component unmounts
    return () => {
      window.openModal = undefined;
    };
  }, []);

  return(
    <>
      <Unity unityProvider={unityProvider} className=".unity-canvas" style={{ width: '100%', height: '100vh' }} devicePixelRatio={window.devicePixelRatio} />      
      {isModalOpen && (
        <Lightbox
          slides={[
            {
              src: imageUrl,
              title: header,
              description: details
            }
          ]}                   
          open={isModalOpen}
          close={() => setIsModalOpen(false)}
          plugins={[Captions , Zoom]}          
          captions={{
            showToggle: true,
            descriptionTextAlign: "start",
            descriptionMaxLines: 3
          }}
          zoom={{
            maxZoomPixelRatio: 5,
            zoomInMultiplier: 1.5,
            doubleTapDelay: 300,
            doubleClickDelay: 300,
            doubleClickMaxStops: 2,
            keyboardMoveDistance: 50,
            wheelZoomDistanceFactor: 100,
            pinchZoomDistanceFactor: 100,
            scrollToZoom: false,
          }}
        />
      )}
    </>  
  );
}

export default App;
