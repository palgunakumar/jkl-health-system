import React, { useState } from 'react';
import { Drawer, Button, SelectPicker, Form,  ButtonToolbar, Schema } from 'rsuite';
import { useDispatch } from 'react-redux';
import { removeUserRole } from '../../../redux/auth'; // Import the Redux action

const { StringType } = Schema.Types;

const RemoveRoleDrawer = ({ user, open, onClose }) => {
    const dispatch = useDispatch();
    const [selectedRole, setSelectedRole] = useState(null);    
    const model = Schema.Model({
        role: StringType().isRequired('Please select or enter a role'),
    });

    const handleAddRole = () => {
        if (selectedRole) {
            dispatch(removeUserRole(user?.uid, selectedRole));
            onClose(); // Close the drawer after adding the role
        }
    };

    return (
        <Drawer size="sm" open={open} onClose={onClose}>
            <Drawer.Header>
                <Drawer.Title>Remove Role</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <Form model={model} onSubmit={handleAddRole}>
                    <Form.Group>
                        <Form.ControlLabel>Select a Role</Form.ControlLabel>
                        <SelectPicker 
                            data={user?.roles?.map((role) => ({label: role, value: role}))} 
                            value={selectedRole} 
                            onChange={setSelectedRole} 
                            style={{ width: 224 }} 
                            placeholder="Select a role"
                            block
                        />
                    </Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={handleAddRole}>
                            Remove Role
                        </Button>
                        <Button onClick={onClose} appearance="subtle">
                            Cancel
                        </Button>
                    </ButtonToolbar>
                </Form>
            </Drawer.Body>
        </Drawer>
    );
};

export default RemoveRoleDrawer;
