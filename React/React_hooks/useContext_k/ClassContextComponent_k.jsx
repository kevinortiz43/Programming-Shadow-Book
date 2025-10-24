import React, { Component } from "react";
import { ThemeContext } from "./useContext_k";

export default class ClassContextComponent_k extends Component {
  return() {
    <div>
      {/* step 5 this componenet will consume that prop */}
      <ThemeContext.Consumer>
        {(darkTheme) => {
          return <div style={this.themeStyles(darkTheme)}> class theme</div>;
        }}
      </ThemeContext.Consumer>
    </div>;
  }
}
