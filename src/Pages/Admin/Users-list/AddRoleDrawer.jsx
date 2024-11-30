import React, { useState } from 'react';
import { Drawer, Button, SelectPicker, Form,  ButtonToolbar, Schema } from 'rsuite';
import { useDispatch } from 'react-redux';
import { addUserRole } from '../../../redux/auth'; // Import the Redux action

const { StringType } = Schema.Types;

const AddRoleDrawer = ({ user, open, onClose }) => {
    const dispatch = useDispatch();
    const [selectedRole, setSelectedRole] = useState(null);    
    const model = Schema.Model({
        role: StringType().isRequired('Please select or enter a role'),
    });

    const roles = [
        { label: 'ADMIN', value: 'ADMIN', color: 'orange' },
        { label: 'USER', value: 'USER', color: 'green' },
        { label: 'SUPER_ADMIN', value: 'SUPER_ADMIN', color: 'red' },
        { label: 'PATIENT', value: 'PATIENT', color: 'blue' },
        { label: 'CAREGIVER', value: 'CAREGIVER', color: 'violet' }
    ];
    const availableRoles = roles.filter(role => !user?.roles.includes(role.value));

    const handleAddRole = () => {
        if (selectedRole) {
            dispatch(addUserRole(user?.uid, selectedRole));
            onClose(); // Close the drawer after adding the role
        }
    };

    return (
        <Drawer size="sm" open={open} onClose={onClose}>
            <Drawer.Header>
                <Drawer.Title>Add Role</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <Form model={model} onSubmit={handleAddRole}>
                    <Form.Group>
                        <Form.ControlLabel>Select a Role</Form.ControlLabel>
                        <SelectPicker 
                            data={availableRoles} 
                            value={selectedRole} 
                            onChange={setSelectedRole} 
                            style={{ width: 224 }} 
                            placeholder="Select a role"
                            block
                        />
                    </Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={handleAddRole}>
                            Add Role
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

export default AddRoleDrawer;
