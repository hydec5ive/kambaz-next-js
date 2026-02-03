"use client";

import Nav from 'react-bootstrap/esm/Nav';
import NavItem from 'react-bootstrap/esm/NavItem';
import NavLink from 'react-bootstrap/esm/NavLink';
import Link from "next/link";

export default function TOC() {
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink href="/labs" as={Link}>Labs</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab1" as={Link}>Lab 1</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab2" as={Link}>Lab 2</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab3" as={Link}>Lab 3</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/" as={Link}>Kambaz</NavLink>
      </NavItem>
      <NavItem>
        <NavLink id="wd-github" href="https://github.com/hydec5ive/kambaz-next-js">My GitHub</NavLink>
      </NavItem>
    </Nav>
  );
}