import { useState } from 'react';
import style from './login.module.scss';
import SwitchLogin from '../../assets/components/Login/SwitchLogin/Switch';
import { Divider } from '../../assets/elements/common';
import Svg from '../../../utils/svg';
import FormLogin from '../../assets/components/Login/Form/Form';

function Login() {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchChecked(checked);
  };

  const rootStyle = getComputedStyle(document.documentElement);

  const cssVariables = {
    primary: rootStyle.getPropertyValue('--primary').trim(),
    primaryDark: rootStyle.getPropertyValue('--primarydark').trim(),
    secondary: rootStyle.getPropertyValue('--secondary').trim(),
    secondaryDark: rootStyle.getPropertyValue('--secondarydark').trim(),
  };

  const svgStyle = {
    '--first-color': isSwitchChecked
      ? cssVariables.secondary
      : cssVariables.primary,
    '--second-color': isSwitchChecked
      ? cssVariables.secondaryDark
      : cssVariables.primaryDark,
  };

  return (
    <div className={style.container}>
      <Svg
        name="svg_login"
        svgPath="./patterns_background.svg"
        style={svgStyle}
        key={`${svgStyle['--first-color']}-${svgStyle['--second-color']}`}
      />
      <div className={style.content}>
        <div className={style.container_form}>
          <SwitchLogin onChange={handleSwitchChange} />
          <div className={style.content_form}>
            <FormLogin switchStage={isSwitchChecked} />
          </div>
        </div>
        <Divider
          $width="3px"
          $height="80%"
          $radius="16px"
          $colorBG={
            isSwitchChecked ? cssVariables.secondary : cssVariables.primary
          }
        />
        <div className={style.container_shape}>
          <Svg
            name="svg_shape"
            svgPath="./shape_login.svg"
            style={svgStyle}
            key={`${svgStyle['--first-color']}`}
          />
          <div className={style.container_shape_img}>
            <Svg
              name="svg_mascot"
              svgPath="./Kode.svg"
              style={svgStyle}
              key={`${svgStyle['--first-color']}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
