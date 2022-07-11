import { CommentOutlined, GlobalOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Row } from "antd";
import AnalyticsApi, { LocationAndLanguageResponse } from "api/analytics";
import { useEffect, useMemo, useState } from "react";
import WorldMap from "react-svg-worldmap";
import { roundsTheNumber } from "utils/functions";

const YourReachPage = () => {
  const [location, setLocation] = useState<{
    loaded: boolean;
    data: LocationAndLanguageResponse["locationData"];
  }>({ loaded: false, data: [] });
  const [language, setLanguage] = useState<{
    loaded: boolean;
    data: LocationAndLanguageResponse["languageData"];
  }>({ loaded: false, data: [] });

  useEffect(function getLocationData() {
    AnalyticsApi.get()
      .then(({ data }) => {
        setLocation({ data: data.locationData, loaded: true });
        setLanguage({ data: data.languageData, loaded: true });
      })
      .catch((_) => {
        setLocation({ data: [], loaded: true });
        setLanguage({ data: [], loaded: true });
      });
  }, []);

  const totalLanguages = useMemo(
    () => language.data.reduce((total, current) => (total += current.total), 0),
    [language.data]
  );

  const languageData = useMemo(() => {
    const arrayLanguagesData: {
      value: number;
      percent: number;
      language: string;
    }[] = [];

    language.data
      .sort((a, b) => b.total - a.total)
      .forEach((item, i) => {
        arrayLanguagesData.push({
          language: item.language,
          value: item.total,
          percent:
            i < language.data.length - 1
              ? parseFloat(
                  roundsTheNumber((item.total / totalLanguages) * 100, 1)
                )
              : 100 -
                arrayLanguagesData.reduce(
                  (total, current) => (total += current.percent),
                  0
                ),
        });
      });

    return arrayLanguagesData;
  }, [language.data]);

  const totalStudents = useMemo(
    () => location.data.reduce((total, current) => (total += current.total), 0),
    [location.data]
  );

  const locationData = useMemo(() => {
    const arrayCountryData: {
      country: string;
      value: number;
      percent: number;
      name: string;
      language: string;
    }[] = [];

    location.data
      .sort((a, b) => b.total - a.total)
      .forEach((item, i) => {
        arrayCountryData.push({
          country: item.country_code,
          name: item.country,
          language: item.language,
          value: item.total,
          percent:
            i < location.data.length - 1
              ? parseFloat(
                  roundsTheNumber((item.total / totalStudents) * 100, 1)
                )
              : 100 -
                arrayCountryData.reduce(
                  (total, current) => (total += current.percent),
                  0
                ),
        });
      });

    return arrayCountryData;
  }, [location.data]);

  return (
    <div>
      <h2>Phạm vi tiếp cận</h2>
      <div className="center">
        <WorldMap
          color="#4c38ff"
          title="Số học viên theo từng quốc gia"
          value-suffix="học viên"
          size={900}
          data={locationData}
          tooltipTextFunction={(value) =>
            value.countryName + ": " + value.countryValue + " học viên"
          }
        />
      </div>
      <div className="detail">
        <Row gutter={16}>
          <Col span={12}>
            <Card
              title={
                locationData.length > 0 ? (
                  <div>
                    <GlobalOutlined className="mr-1" />
                    {locationData.length} quốc gia
                  </div>
                ) : (
                  "Quốc gia"
                )
              }
              bordered={false}
              headStyle={{ background: "#f8eaea" }}
            >
              {locationData.length < 1
                ? "Hiện chưa có thông tin!"
                : locationData.map((item, i) => {
                    return (
                      <div>
                        <Row justify="space-between">
                          <div>
                            {i + 1}. {item.name}
                          </div>
                          <div>
                            {roundsTheNumber(item.percent, 1)}%{" "}
                            <span style={{ color: "#978585" }}>
                              ({item.value})
                            </span>
                          </div>
                        </Row>
                        {i < locationData.length - 1 && (
                          <Divider style={{ margin: "5px 0" }} />
                        )}
                      </div>
                    );
                  })}
            </Card>
          </Col>
          <Col span={12}>
            <Card
              headStyle={{ background: "#f8eaea" }}
              title={
                <div>
                  {locationData.length > 0 ? (
                    <div>
                      <CommentOutlined className="mr-1" /> {totalLanguages} ngôn
                      ngữ
                    </div>
                  ) : (
                    "Ngôn ngữ"
                  )}
                </div>
              }
              bordered={false}
            >
              {languageData.length < 1
                ? "Hiện chưa có thông tin!"
                : languageData.map((item, i) => {
                    return (
                      <div>
                        <Row justify="space-between">
                          <div>
                            {i + 1}. {item.language}
                          </div>
                          <div>
                            {roundsTheNumber(item.percent, 1)}%{" "}
                            <span style={{ color: "#978585" }}>
                              ({item.value})
                            </span>
                          </div>
                        </Row>
                        {i < languageData.length - 1 && (
                          <Divider style={{ margin: "5px 0" }} />
                        )}
                      </div>
                    );
                  })}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default YourReachPage;
