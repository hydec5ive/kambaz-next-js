"use client";
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import ModuleEditor from "./ModuleEditor";
export default function ModulesControls({ moduleName, setModuleName, addModule }: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger" id="wd-add-module-btn" className="me-1 float-end" onClick={handleShow}>
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>
      <Dropdown className="float-end me-1">
        <Dropdown.Toggle variant="secondary" id="wd-publish-all-btn">
          <FaCheckCircle className="text-success me-1" />
          Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <FaCheckCircle className="text-success me-2" />
            Publish All
          </Dropdown.Item>
          <Dropdown.Item>
            <FaCheckCircle className="text-success me-2" />
            Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item>
            <FaCheckCircle className="text-success me-2" />
            Publish modules only
          </Dropdown.Item>
          <Dropdown.Item>
            Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item>
            Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="secondary" className="float-end me-1">View Progress</Button>
      <Button variant="secondary" className="float-end me-1">Collapse All</Button>
      <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
        moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
    </div>
);}
