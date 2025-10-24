import React, { Component } from 'react'
import { ThemeContext } from './App'

// this use with class might be deprecated - just use functionContextComponents instead since then you don't have to worry about all the unecessary nesting below, esp in the render() return statement!!!

export default class ClassContextComponent extends Component {
    themeStyles(dark) {
        return {
            backgroundColor: dark ? '#333' : '#CCC',
            color: dark ?  '#CCC' : '#333' ,
            padding: '2rem',
            margin: '2rem'
        }
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {darkTheme => {
                    return <div style={this.themeStyles(darkTheme)}>Class Theme</div>
                }}
            </ThemeContext.Consumer>
        )
    }
}