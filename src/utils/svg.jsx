import { useEffect } from 'react';

const SVG = (props) => {
   useEffect(() => {
      var SVG_object = document.getElementById(props.name);

      if (SVG_object != null) SVG_object.onload = function () {
         for (const [key, value] of Object.entries(props.style))
            SVG_object.contentWindow.document.querySelector("svg").style.setProperty(key, value)
      };
   }, [props.name, props.svgPath, props.style, props.key]);

   return (
      <>
         <object id={props.name} type="image/svg+xml" data={props.svgPath} key={props.key}></object>
      </>
   );
}

export default SVG;