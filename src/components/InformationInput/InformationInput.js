import React, { useState, useEffect } from 'react'
import Text from '../Text/Text';
import { Input, Checkbox, Select, Switch } from 'antd'
import NumericInput from '../NumericInput/NumericInput';
import "./InformationInput.css"
const { Option } = Select;

const data = require("../../EducationSet.json");
const data2 = require("../../EducationSetV2.json");


const InformationInput = ({information, setInformation, notShowSwitch, page}) => {

    return (
    <div className="informationInput">
        {information?.school!=null &&
            <div className="informationInput__item informationInput__Input">
                <Text color='black' cls='Small' content={"School"} fontSize='15' display="inline-block" />
                {/* <Input showCount maxLength={20} placeholder="school" onChange={(ev) => setInformation({...information, school: ev.target.value})} value={information?.school} />  */}
                <Select showSearch className="informationInput__item__Dropdown" onChange={(school) => setInformation({...information, school: school})} value={information?.school}>
                    {Object.keys(data2).map((school, index) => (
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
                    {information?.school && data2[information?.school].map((department, index) => (
                        <Option key={department}>{department}</Option>
                    )
                    )}
                    {(page == 'QnAEditPage' || page == 'QnANewPage') && data.departments.map((department, index) => (
                        <Option key={department}>{department}</Option>
                    )
                    )}
                </Select>
            </div>  
        }
        {information?.subject!=null &&
            <div className="informationInput__item informationInput__Input">
                <Text color='black' cls='Small' content={"Subject"} fontSize='15' display="inline-block" />
                <Input showCount maxLength={50} placeholder="Subject" onChange={(ev) => setInformation({...information, subject: ev.target.value})} value={information?.subject} /> 
            </div>  
        }
        {information?.professor!=null &&
            <div className="informationInput__item informationInput__Input">
                <Text color='black' cls='Small' content={"Instructor"} fontSize='15' display="inline-block" />
                <Input showCount maxLength={50} placeholder="Instructor" onChange={(ev) => setInformation({...information, professor: ev.target.value})} value={information?.professor} /> 
            </div>  
        }
        <div className="informationInput__InputNumbers">
            {(information?.bestPrice!=null) &&
                <div className="informationInput__item informationInput__InputNumber">
                    <Text color='black' cls='Small' content={"Price"} fontSize='15' display="inline-block" />
                    <NumericInput placeholder="$" onChange={(value) => setInformation({...information, bestPrice: value})} value={information?.bestPrice} /> 
                </div>  
            }
            {(information?.price!=null) &&
                <div className="informationInput__item informationInput__InputNumber">
                    <Text color='black' cls='Small' content={"Price"} fontSize='15' display="inline-block" />
                    <NumericInput placeholder="$" onChange={(value) => setInformation({...information, price: value})} value={information?.price} /> 
                </div>  
            }
            {information?.referencePrice!=null &&
                <div className="informationInput__item informationInput__InputNumber">
                    <Text color='black' cls='Small' content={"Reference Price"} fontSize='15' display="inline-block" />
                    <Input placeholder="$" onChange={(ev) => setInformation({...information, referencePrice: ev.target.value})} value={information?.referencePrice} /> 
                </div>  
            }
            {information?.referenceNumber!=null &&
                <div className="informationInput__item informationInput__InputNumber">
                    <Text color='black' cls='Small' content={"Reference Number"} fontSize='15' display="inline-block" />
                    <Input placeholder="Number" onChange={(ev) => setInformation({...information, referenceNumber: ev.target.value})} value={information?.referenceNumber} /> 
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
            {( information?.public!=null && !notShowSwitch) &&
                <div className="informationInput__item informationInput__Public">
                    {information?.public?
                    <Switch checkedChildren="Public" unCheckedChildren="Private" defaultChecked onChange={(checked) => {
                        setInformation({...information, public: checked})}}
                    />
                    :
                    <Switch checkedChildren="Public" unCheckedChildren="Private" onChange={(checked) => {
                        setInformation({...information, public: checked})}}
                    />
                    }
                    
                </div>  
            }
        </div>
    </div>
    )
}


export default InformationInput