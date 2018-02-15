import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import {
  Segment,
  Button,
  Modal,
  Header,
  Form,
  Checkbox,
} from 'semantic-ui-react';

const languages = [
  'javascript',
  'java',
  'python',
  'c_cpp',
  'markdown',
  'mysql',
  'json',
  'html'
]

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal'
]

languages.forEach((lang) => {
  require(`brace/mode/${lang}`)
  require(`brace/snippets/${lang}`)
})

themes.forEach((theme) => {
  require(`brace/theme/${theme}`)
})

class IDE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ``,
      theme: 'github',
      mode: 'c_cpp',
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: false,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true
    }
    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
  }
  onChange(newValue) {
    //console.log('change', newValue);
    this.setState({value: newValue})
    if(this.props.updateCode){
      this.props.updateCode(newValue);
    }
  }
  setTheme(e) {
    this.setState({theme: e.target.value})
  }
  setMode(e) {
    this.setState({mode: e.target.value})
  }
  setBoolean(name, value) {
    this.setState({[name]: value})
  }
  setFontSize(e) {
    this.setState({
      fontSize: parseInt(e.target.value, 10)
    })
  }
  render() {
    return (<div>
      <Segment attached='top'>
        <Modal trigger={
              <Button floated='right' icon='settings' />
          } closeIcon>
          <Header icon='archive' content='IDE Settings'/>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <div className="field">
                  <label>
                    Mode:
                  </label>
                  <p className="control">
                    <span className="select">
                      <select name="mode" onChange={this.setMode} value={this.state.mode}>
                        {languages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                      </select>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <label>
                    Theme:
                  </label>
                  <p className="control">
                    <span className="select">
                      <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
                        {themes.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                      </select>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <label>
                    Font Size:
                  </label>
                  <p className="control">
                    <span className="select">
                      <select name="Font Size" onChange={this.setFontSize} value={this.state.fontSize}>
                        {
                          [
                            14,
                            16,
                            18,
                            20,
                            24,
                            28,
                            32,
                            40
                          ].map((lang) => <option key={lang} value={lang}>{lang}</option>)
                        }
                      </select>
                    </span>
                  </p>
                </div>
                <div className="field">

                  <Checkbox
                    checked={this.state.enableBasicAutocompletion}
                    onChange={(e) => this.setBoolean('enableBasicAutocompletion', !this.state.enableBasicAutocompletion)}
                    label="Enable Basic Autocomplete"
                  />

                </div>
                <div className="field">

                  <Checkbox
                    checked={this.state.enableLiveAutocompletion}
                    onChange={(e) => this.setBoolean('enableLiveAutocompletion', !this.state.enableLiveAutocompletion)}
                    label="Enable Live Autocomplete"/>


                </div>
                <div className="field">

                  <Checkbox
                    checked={this.state.showGutter}
                    onChange={(e) => this.setBoolean('showGutter', !this.state.showGutter)}
                    label="Show Gutter"/>


                </div>
                <div className="field">

                  <Checkbox
                    checked={this.state.showPrintMargin}
                    onChange={(e) => this.setBoolean('showPrintMargin', !this.state.showPrintMargin)}
                    label="Show Print Margin"
                  />


                </div>
                <div className="field">

                  <Checkbox
                    checked={this.state.highlightActiveLine}
                    onChange={(e) => this.setBoolean('highlightActiveLine', !this.state.highlightActiveLine)}
                    label="Highlight Active Line"
                  />


                </div>
                <div className="field">

                  <Checkbox
                    checked={this.state.enableSnippets}
                    onChange={(e) => this.setBoolean('enableSnippets', !this.state.enableSnippets)}
                    label="Enable Snippets"
                  />

                </div>
                <div className="field">
                  <Checkbox
                    checked={this.state.showLineNumbers}
                    onChange={(e) => {this.setBoolean('showLineNumbers', !this.state.showLineNumbers)}}
                    label="Show Line Numbers"/>
                </div>
              </Form>

            </Modal.Description>
          </Modal.Content>
        </Modal>
        {this.props.buttons}
      </Segment>
      <Segment attached>
        <AceEditor mode={this.state.mode}
          theme={this.state.theme}
          name="gcettsjeditor"
          onLoad={this.onLoad}
          onChange={this.onChange}
          width='100%'
          onSelectionChange={this.onSelectionChange}
          onCursorChange={this.onCursorChange}
          onValidate={this.onValidate}
          value={this.state.value}
          fontSize={this.state.fontSize}
          showPrintMargin={this.state.showPrintMargin}
          showGutter={this.state.showGutter}
          highlightActiveLine={this.state.highlightActiveLine}
          setOptions={{
            enableBasicAutocompletion: this.state.enableBasicAutocompletion,
            enableLiveAutocompletion: this.state.enableLiveAutocompletion,
            enableSnippets: this.state.enableSnippets,
            showLineNumbers: this.state.showLineNumbers,
            tabSize: 4
          }}/>
      </Segment>
      <Segment attached='bottom'>

        {this.props.children}
      </Segment>
    </div>)
  }
}
export default IDE;
