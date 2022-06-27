import React, { useState, useEffect } from 'react'
import Text from '../Text/Text';
import { Input, Checkbox, Select } from 'antd'
import NumericInput from '../NumericInput/NumericInput';
import "./InformationInput.css"
const { Option } = Select;

const data = require("../../EducationSet.json");

const InformationInput = ({information, setInformation}) => {

    return (
    <div className="informationInput">
        {information?.school!=null &&
            <div className="informationInput__item informationInput__Input">
                <Text color='black' cls='Small' content={"School"} fontSize='15' display="inline-block" />
                {/* <Input showCount maxLength={20} placeholder="school" onChange={(ev) => setInformation({...information, school: ev.target.value})} value={information?.school} />  */}
                <Select showSearch className="informationInput__item__Dropdown" onChange={(school) => setInformation({...information, school: school})} value={information?.school}>
                    {data.schools.map((school, index) => (
                        <Option key={school}>{school}</Option>
                    )
                    )}
                </Select>
            </div>  
        }
        {information?.department!=null &&
            <div className="informationInput__item informationInput__Input">
                <Text color='black' cls='Small' content={"Department"} fontSize='15' display="inline-block" />
                {/* <Input showCount maxLength={20} placeholder="department" onChange={(ev) => setInformation({...information, department: ev.target.value})} value={information?.department} />  */}
                <Select showSearch className="informationInput__item__Dropdown" onChange={(department) => setInformation({...information, department: department})} value={information?.department}>
                    {data.departments.map((department, index) => (
                        <Option key={department}>{department}</Option>
                    )
                    )}
                </Select>
            </div>  
        }
        {information?.subject!=null &&
            <div className="informationInput__item informationInput__Input">
                <Text color='black' cls='Small' content={"Subject"} fontSize='15' display="inline-block" />
                <Input showCount maxLength={20} placeholder="subject" onChange={(ev) => setInformation({...information, subject: ev.target.value})} value={information?.subject} /> 
            </div>  
        }
        {information?.professor!=null &&
            <div className="informationInput__item informationInput__Input">
                <Text color='black' cls='Small' content={"professor"} fontSize='15' display="inline-block" />
                <Input showCount maxLength={20} placeholder="professor" onChange={(ev) => setInformation({...information, professor: ev.target.value})} value={information?.professor} /> 
            </div>  
        }
        {information?.bestPrice!=null &&
            <div className="informationInput__item informationInput__InputNumber">
                <Text color='black' cls='Small' content={"Price"} fontSize='15' display="inline-block" />
                <NumericInput placeholder="$" onChange={(value) => setInformation({...information, bestPrice: value})} value={information?.bestPrice} /> 
            </div>  
        }
        {information?.referencePrice!=null &&
            <div className="informationInput__item informationInput__InputNumber">
                <Text color='black' cls='Small' content={"Ref Price"} fontSize='15' display="inline-block" />
                <Input placeholder="$" onChange={(ev) => setInformation({...information, referencePrice: ev.target.value})} value={information?.referencePrice} /> 
            </div>  
        }
        {information?.referenceNumber!=null &&
            <div className="informationInput__item informationInput__InputNumber">
                <Text color='black' cls='Small' content={"Ref Num"} fontSize='15' display="inline-block" />
                <Input placeholder="$" onChange={(ev) => setInformation({...information, referenceNumber: ev.target.value})} value={information?.referenceNumber} /> 
            </div>  
        }
        {information?.downloadable!=null &&
            <div className="informationInput__item informationInput__Checkbox">
                <Checkbox.Group 
                    options={[{
                                label: 'Downloadable',
                                value: 'Downloadable',
                            }]} 

                    defaultValue={['Downloadable']}
                    onChange={(value) => {
                    if(value[0]) setInformation({...information, downloadable: true})
                    else setInformation({...information, downloadable: false})
                }} />
            </div>  
        }
    </div>
    )
}


export default InformationInput