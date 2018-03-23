import React, { Component } from "react";
import { firestore } from "~/fire";
import ReactDOM from "react-dom";
import Mark from "mark.js";
import { createHighlightedObj, urlEncode } from "../highlighting";

//Firestore
const Highlights = firestore.collection("Highlights");
const Annotations = firestore.collection("Annotations");
const urlPages = firestore.collection("urlPages");
const Websites = firestore.collection("Websites");

export default class CreateHighlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      highlightText: "",
      highlightObj: {},
      markInstance: ""
    };
    this.onHighlightClick = this.onHighlightClick.bind(this);
  }

  handleChange = event => {
    event.preventDefault();
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  async onHighlightClick(event) {
    try {
      event.preventDefault();
      const highlightObj = createHighlightedObj();
      console.log("onHighlightClick: ", highlightObj);
      if (this.state.markInstance) this.state.markInstance.unmark();
      console.log("DOM path", highlightObj.domPath);
      const markInstance = await new Mark(highlightObj.domPath);
      this.setState(
        {
          highlightObj,
          markInstance,
          highlightText: highlightObj.newString
        },
        () => {
          markInstance.mark(this.state.highlightObj.newString, {
            acrossElements: true,
            separateWordSearch: false,
            className: "chromelights-highlights"
          });
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const { newString, domPath, url } = this.state.highlightObj;
    const submitUrl = urlEncode(url);
    const messageSubmit = this.state.message;
    const { value } = event.target;
    const newFireHL = {
      newString,
      submitUrl,
      messageSubmit,
      domPath
    };
    console.log("newFireHL", newFireHL);

    Websites.doc(submitUrl)
      .collection("newCollection")
      .add(newFireHL)
      .then(entry => console.log("added entry: ", entry))
      .catch(error => console.log("error: ", error));
  };

  render() {
    return (
      <div>
        <h2> Highlight text to ask or annotate! </h2>
        <button onClick={this.onHighlightClick}>Create</button>
        <h4>Highlighted text: {this.state.highlightText}</h4>
        <h5>User name, data </h5>
        <div id="message-form">
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="message"
              className="message-field-wide"
              onChange={this.handleChange}
              value={this.state.message}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
