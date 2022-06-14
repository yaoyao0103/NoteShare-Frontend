import React, { useState, useEffect } from 'react';
import {  Row, Col, Card, Statistic } from "antd";
import { UserOutlined } from '@ant-design/icons';
import './FansNFollower.css'

function FansNFollower() {
    return (
        <div className="FansNFollower">
            <Row gutter={5} className="FansNFollower__Row">
                <Col span={12} className="FansNFollower__Follower">
                    <Card className="FansNFollower__Follower__Card">
                        <Statistic
                            title="Follower"
                            value={300}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                    
                        />
                    </Card>
                </Col>
                <Col span={12} className="FansNFollower__Fans">
                    <Card className="FansNFollower__Fans__Card">
                        <Statistic
                            title="Fans"
                            value={100}
                            valueStyle={{
                                color: '#3f8600',
                            }}

                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
export default FansNFollower;