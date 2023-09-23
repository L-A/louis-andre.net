import React, { createElement } from "react";
import Page from "../layouts/page";
import marksy from "marksy";
import Head from "next/head";

export default Page((props) => {
  let postContent = props.postMarkdown
    ? [props.children, compile(props.postMarkdown).tree]
    : props.children;

  return (
    <div>
      <h1
        className="ph3 ph5-m ph6-l f1 measure-narrow"
        style={{ color: props.titleColor }}
      >
        {props.title}
      </h1>
      <div className="ph3 ph5-m ph6-l lh-copy">{postContent}</div>
      <Head>
        <title>{props.title} - Louis-André Labadie</title>
      </Head>
    </div>
  );
});

const titleStyle = (titleColor) => {
  color: titleColor;
};

const compile = marksy({
  createElement,
  elements: {
    img: ({ src, alt }) => <img className="mw-100" src={src} alt={alt} />,
    p: ({ children }) => <p className="f4 measure"> {children} </p>,
    h2: ({ children }) => (
      <h2 className="f2 dark-gray measure"> {children} </h2>
    ),
    h3: ({ children }) => <h3 className="f3 fw3 measure"> {children} </h3>,
    hr: () => <hr className="f4 mv5 mh0 measure" />,
    a: ({ href, children }) => (
      <a className="link dim blue" href={href}>
        {" "}
        {children}{" "}
      </a>
    ),
    li: ({ children }) => (
      <li className="f4 measure mv2 dark-gray"> {children} </li>
    ),
  },
});
