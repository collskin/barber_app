import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { Calendar, Col, Radio, Row, Select, theme, Typography, ConfigProvider } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import enGB from 'antd/es/locale/en_GB';
import { getFirstWorkdayOfMonth } from '@/app/data';


dayjs.extend(dayLocaleData);

export const CustomCalendar = ({ onChange }: { onChange: (date: Dayjs) => void }) => {
    const { token } = theme.useToken();

    const wrapperStyle: React.CSSProperties = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };


    return (
        <div >
            <ConfigProvider locale={enGB} >
                <Calendar
                    defaultValue={getFirstWorkdayOfMonth()}
                    onChange={onChange}
                    className='calendar'
                    disabledDate={(current) =>
                        !current || // Handle null or undefined values
                        current.isBefore(dayjs(), 'day') || // Disable all past dates
                        current.day() === 6 || // Disable Saturdays
                        current.day() === 0 // Disable Sundays
                    }                                     
                    fullscreen={false}
                    headerRender={({ value, type, onChange, onTypeChange }) => {
                        const start = 0;
                        const end = 12;
                        const monthOptions = [];

                        let current = value.clone();
                        const localeData = value.localeData();
                        const months = [];
                        for (let i = 0; i < 12; i++) {
                            current = current.month(i);
                            months.push(localeData.monthsShort(current));
                        }

                        for (let i = start; i < end; i++) {
                            monthOptions.push(
                                <Select.Option key={i} value={i} className="month-item">
                                    {months[i]}
                                </Select.Option>,
                            );
                        }

                        const year = value.year();
                        const month = value.month();
                        const options = [];
                        for (let i = year - 10; i < year + 10; i += 1) {
                            options.push(
                                <Select.Option key={i} value={i} className="year-item">
                                    {i}
                                </Select.Option>,
                            );
                        }
                        return (
                            <div style={{ padding: 8 }}>
                                <Typography.Title level={4}>Odaberite datum</Typography.Title>
                                <Row gutter={8}>
                                    <Col>
                                        <Radio.Group
                                            size="small"
                                            onChange={(e) => onTypeChange(e.target.value)}
                                            value={type}
                                        >
                                            <Radio.Button value="month">Month</Radio.Button>
                                            <Radio.Button value="year">Year</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            popupMatchSelectWidth={false}
                                            className="my-year-select"
                                            value={year}
                                            onChange={(newYear) => {
                                                const now = value.clone().year(newYear);
                                                onChange(now);
                                            }}
                                        >
                                            {options}
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Select
                                            size="small"
                                            popupMatchSelectWidth={false}
                                            value={month}
                                            onChange={(newMonth) => {
                                                const now = value.clone().month(newMonth).date(new Date().getDate());
                                                onChange(now);
                                            }}
                                        >
                                            {monthOptions}
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        );
                    }}
                />
            </ConfigProvider>
        </div>
    );
};
