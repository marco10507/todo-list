import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";
import React from "react";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {isNotBlank} from '../../helpers/string-helpers';

export default function AddTaskForm(props) {
    const {onSubmitTask} = props;
    const schema = Yup.object().shape({
        subject: Yup.string().required().test('blank-check', "Subject cannot be blank", (subject) => isNotBlank(subject)),
        dueDate: Yup.date().required("Due date is a required field")
    });

    return (
        <Formik
            initialValues={
                {
                    subject: '',
                    dueDate: moment().format("YYYY-MM-DD")
                }
            }
            onSubmit={
                onSubmitTask
            }
            validationSchema={schema}
        >
            {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
              }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="form-subject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            name="subject"
                            value={values.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="enter subject"
                            isInvalid={!!errors.subject}
                        />
                        <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="form-due-date">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            name="dueDate"
                            value={values.dueDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="date"
                            isInvalid={!!errors.dueDate}
                        />
                        <Form.Control.Feedback type="invalid">{errors.dueDate}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type={"submit"}>Submit</Button>
                </Form>
            )}
        </Formik>
    );
}
