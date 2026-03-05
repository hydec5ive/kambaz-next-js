"use client";
import Link from "next/link";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import store from "./store";
import { Provider } from "react-redux";
export default function Lab4() {
  function sayHello() { alert("Hello"); }
  return (
    <Provider store={store}>
      <div id="wd-lab4" className="container">
        <h2>Lab 4</h2>
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        <hr />
        <Link href="/labs/lab4/query-parameters" className="btn btn-info me-2">URL Encoding</Link>
        <Link href="/labs/lab4/redux" className="btn btn-primary me-2">Redux Examples</Link>
        <Link href="/labs/lab4/react-context" className="btn btn-secondary me-2">React Context</Link>
        <Link href="/labs/lab4/zustand" className="btn btn-success">Zustand</Link>
      </div>
    </Provider>
);}