# React Delayed

> Small component for delaying the mounting and unmounting of a child component for CSS animation purposes.

![Travis](http://img.shields.io/travis/Wildhoney/ReactDelayed.svg?style=flat-square)
&nbsp;
![Coveralls](https://img.shields.io/coveralls/Wildhoney/ReactDelayed.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/react-delayed.svg?style=flat-square)
&nbsp;
![License MIT](https://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat-square)

* **npm**: `npm i react-delayed --save`
* **Heroku**: [http://react-delayed.herokuapp.com/](http://react-delayed.herokuapp.com/)

---

## Getting Started

Use the optional `mountAfter` and `unmountAfter` props for delaying the mounting and unmounting of nested components.

```javascript
<Delayed mounted={true} mountAfter={500} unmountAfter={500}>
    <img src="./images/nyan.gif" alt="Nyan" />
</Delayed>
```

When `mounted` is `false` a dummy node will be rendered, which defaults to `span` and can be changed with the `nodeName` prop.

You're also able to pass a *thunk* as the `children` for truly deferred components.

```javascript
<Delayed mounted={true} mountAfter={500} unmountAfter={500}>
    {() => <img src="./images/nyan.gif" alt="Nyan" />}
</Delayed>
```
