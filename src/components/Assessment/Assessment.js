import React from 'react';
import './Assessment.css';
import { assessments } from '../../data';


const Assessment = () => {
    return (
        <div>
            <h2 className='mb-4'>All Assessments</h2>

            <table className="dataTable">
                <colgroup>
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '20%' }} />
                </colgroup>

                <thead>
                    <tr>
                        <th scope="col">Assessment</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        assessments.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.grade}</td>
                                    <td className='status'>
                                        <span className={(item.status === 'Draft' ? 'draft' : item.status === 'Completed' ? 'complete' : 'in-progress').concat(' rounded-pill py-1')}>{item.status}</span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Assessment;