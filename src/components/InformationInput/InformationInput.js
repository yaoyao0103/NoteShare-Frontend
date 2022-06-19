import React, { useState, useEffect } from 'react'
import Text from '../Text/Text';
import { Input, Checkbox } from 'antd'
import NumericInput from '../NumericInput/NumericInput';
import "./InformationInput.css"

const InformationInput = ({information, setInformation}) => {

    return (
    <div className="informationInput">
        {information?.school!=null &&
            <div className="informationInput__item informationInput__Input">
                <Text color='black' cls='Small' content={"School"} fontSize='15' display="inline-block" />
                <Input showCount maxLength={20} placeholder="school" onChange={(ev) => setInformation({...information, school: ev.target.value})} value={information?.school} /> 
            </div>  
        }
        {information?.department!=null &&
            <div className="informationInput__item informationInput__Input">
                <Text color='black' cls='Small' content={"Department"} fontSize='15' display="inline-block" />
                <Input showCount maxLength={20} placeholder="department" onChange={(ev) => setInformation({...information, department: ev.target.value})} value={information?.department} /> 
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
        {information?.price!=null &&
            <div className="informationInput__item informationInput__InputNumber">
                <Text color='black' cls='Small' content={"Price"} fontSize='15' display="inline-block" />
                <NumericInput placeholder="$" onChange={(value) => setInformation({...information, price: value})} value={information?.price} /> 
            </div>  
        }
        {information?.refPrice!=null &&
            <div className="informationInput__item informationInput__InputNumber">
                <Text color='black' cls='Small' content={"Ref Price"} fontSize='15' display="inline-block" />
                <Input placeholder="$" onChange={(ev) => setInformation({...information, refPrice: ev.target.value})} value={information?.refPrice} /> 
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