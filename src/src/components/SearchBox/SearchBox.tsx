import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { SearchEngine } from '../../data/SearchEngine';

import './SearchBox.css';

interface SearchBoxProps {
  engine: SearchEngine,
  onChangeCallback?: Function,
}


function SearchBox({ engine, onChangeCallback }: SearchBoxProps) {

  const [query, setQuery] = useState("")

  // todo: when user clicks "back", clear the input box
  function submit(event:FormEvent<HTMLInputElement>) {
    event.preventDefault();
    event.stopPropagation();
    window.location.assign(engine.url + engine.searchPath(query))
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    // console.log(event.target.value)
    const value = event.target.value
    setQuery(value)
    onChangeCallback && onChangeCallback(value)
  }


  return (
    <Form onSubmit={submit} action="" method="get"> 
      <Form.Group controlId="formSearch">
        <InputGroup className="mb-3 search-box-wrapper">
          <InputGroup.Prepend className="search-box-append"></InputGroup.Prepend>
          <Form.Control
            type="search"
            className="search-box"
            placeholder={` Search ${engine.name}`}
            aria-label="Search Input"
            aria-describedby="search-input"
            // onFocus={() => document.querySelector("#title").innerText = ""}
            // onBlur={() => document.querySelector("#title").innerText = query}
            onChange={onChange}
            defaultValue={query}
            autoComplete="off"
          />
          {/* <Button variant="primary" type="submit">
            x
          </Button> */}
        </InputGroup>
      </Form.Group>
      <Button type="submit" style={{display:"none"}}>Submit</Button>
    </Form>
  )
}


export default SearchBox