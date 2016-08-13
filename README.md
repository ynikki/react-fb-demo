text babel is not a real thing...

it's a transpiler.

it allows us to use ES6 features, that don't normally work in ES5.

it allows us to interpret JSX (it's not Javascript.)

it turns stuff that's not Javascript into actual Javascript.

className special "Class Name"

the return can have one outer element that it can return.

remarkable is a library, converts markdown to HTML.
  what happens if you want to process information & turn it into something else?
  manipulate properties that get passed in.

MARKDOWN
  convert plain text to html.
  ## Hello
    1. Item 1
    1. Item 2
      1. Item 3
    ```
      <h1> HI EVERYONE </h1>
    ```

    *HELLO*
    **WORLD**

anti-patterns:
  in the index.html, ReactDom.render
  <div id="app"></div>
  <div id="app2"></div>
  in the app.js
  ReactDom.render(
    <CommentBox data={data} />,
    document.getElementById('app')
  );
  ReactDom.render(
    <CommentBox data={data} />,
    document.getElementById('app2')
  );

If you try to create a component that has no render method than it will not show.

Abstract Class - you have to implement a method called "foo". It won't tell you how to implement "foo", but it needs to have "foo".

React has one way data.
Frontend can change states that rerenders the view.
immutable state, if something changes, rather than rewrite it, redraw it.
Rerender state.
Only rendering the parts that change.