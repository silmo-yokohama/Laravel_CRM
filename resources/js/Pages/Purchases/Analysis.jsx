import FlashMessage from '@/Components/Forms/Labels/FlashMessage';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { dateTimeToString, dateToString } from '@/common/dateToString';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import PrimaryButton from '@/Components/Forms/Buttons/PrimaryButton';

const Analysis = (props) => {
  const { auth } = props;
  const today = new Date();
  const lastMonth = new Date(today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate());
  const form = useForm({
    startDate: dateToString(lastMonth),
    endDate: dateToString(today),
    type: 'perMonth',
  });
  const [graphData, setGraphData] = useState([]);

  const submitPerDay = () => {
    drawGraph();
  };
  useEffect(() => {
    drawGraph();
  }, []);

  const drawGraph = () => {
    axios
      .get('/api/analysis', {
        params: form.data,
      })
      .then((res) => {
        setGraphData(
          res.data.data.map((data) => {
            return {
              name: data.date,
              uv: data.total / 1000,
            };
          })
        );
      });
  };
  registerLocale('ja', ja);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">商品一覧</h2>}
    >
      <Head title="顧客一覧" />

      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
                  <div className="w-full mx-auto overflow-auto">
                    <form action="" method="post">
                      <div className="container px-5 py-10 mx-auto">
                        <div className="mx-auto">
                          <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/3">
                              <div className="relative">
                                <label
                                  htmlFor="startDate"
                                  className="leading-7 text-sm text-gray-600"
                                >
                                  開始日
                                </label>
                                <DatePicker
                                  showYearPicker
                                  name="startDate"
                                  id="startDate"
                                  selected={new Date(form.data.startDate)}
                                  dateFormat="yyyy/MM/dd"
                                  maxDate={new Date()}
                                  placeholderText=""
                                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                                  onChange={(selectedDate) => {
                                    form.setData('startDate', dateToString(selectedDate));
                                  }}
                                />
                              </div>
                            </div>
                            <div className="p-2 w-1/3">
                              <div className="relative">
                                <label
                                  htmlFor="endDate"
                                  className="leading-7 text-sm text-gray-600"
                                >
                                  終了日
                                </label>
                                <DatePicker
                                  showMonthYearPicker
                                  name="endDate"
                                  id="endDate"
                                  selected={new Date(form.data.endDate)}
                                  dateFormat="yyyy/MM/dd"
                                  maxDate={new Date()}
                                  placeholderText=""
                                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:border-0 disabled:bg-transparent"
                                  onChange={(selectedDate) => {
                                    form.setData('endDate', dateToString(selectedDate));
                                  }}
                                />
                              </div>
                            </div>

                            <div className="p-2 w-1/3">
                              <div className="relative">
                                <PrimaryButton
                                  type="button"
                                  className="mt-8"
                                  onClick={submitPerDay}
                                >
                                  分析
                                </PrimaryButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    {graphData.length > 0 ? (
                      <LineChart width={900} height={450} data={graphData} className="w-full">
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                      </LineChart>
                    ) : (
                      <div className="h-20 flex justify-center">Not Data</div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <FlashMessage flash={props.flash} />
    </AuthenticatedLayout>
  );
};

export default Analysis;
