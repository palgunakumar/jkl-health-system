import React from "react";
import { Form, Input } from "rsuite";
export const TextField = React.forwardRef((props, ref) => {
    const { name, label, accepter, ...rest } = props;
    return (
      <Form.Group controlId={`${name}`} ref={ref}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control name={name} accepter={accepter} {...rest} />
      </Form.Group>
    );
  });
export const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);