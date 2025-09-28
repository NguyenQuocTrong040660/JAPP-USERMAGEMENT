// src/app/view/dashboard/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Breadcrumb, SimpleCard } from "../../components";
import { getLangText } from "../../utils/@lang";
import { getBreadCrumb } from "../../utils/@utils";
import apiService from "../../services/apiService";

// Bật mock qua biến môi trường nếu muốn (file .env.local: VITE_USE_MOCK=true)
const USE_MOCK = import.meta?.env?.VITE_USE_MOCK === "true";

// Mock data hiển thị ngay lập tức
const MOCK_DASHBOARD = {
  incomingchart: [12, 18, 22, 30, 28, 35, 40, 38, 32, 29, 25, 20],
  outgoingchart: [10, 14, 19, 21, 20, 26, 28, 30, 27, 24, 22, 18],
  transactionchart: [65, 35], // [incoming%, outgoing%]
  sumuser: 1234,
  sumtransaction: 9876,
  sumincoming: 543210000,
  sumoutgoing: 432100000,
};

export default function Dashboard() {
  const language = useSelector((state) => state.language);
  const user = useSelector((state) => state.user);

  const baseBar = useMemo(
    () => ({
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
      datasets: [
        { label: "Incoming", backgroundColor: "rgb(136, 165, 225)", data: [] },
        { label: "Outgoing", backgroundColor: "rgb(56, 88, 152)", data: [] },
      ],
    }),
    []
  );

  const baseDonut = useMemo(
    () => ({
      labels: ["Incoming", "Outgoing"],
      datasets: [
        {
          label: "Percent of transaction",
          data: [],
          backgroundColor: ["rgb(136,165,225)", "rgb(56,88,152)"],
          borderWidth: 1,
        },
      ],
    }),
    []
  );

  const [loading, setLoading] = useState(false);
  const [cardList, setCardList] = useState([
    { icon: "i-Add-User", title: "0", subtitle: "users" },
    { icon: "i-Monitor-5", title: "0", subtitle: "transaction" },
    { icon: "i-Down", title: "0", subtitle: "incoming" },
    { icon: "i-Up", title: "0", subtitle: "outgoing" },
  ]);
  const [barData, setBarData] = useState(baseBar);
  const [donutData, setDonutData] = useState(baseDonut);

  // apply dữ liệu (mock hoặc api) vào state hiển thị
  const applyResponse = (res) => {
    const bar = JSON.parse(JSON.stringify(baseBar));
    const donut = JSON.parse(JSON.stringify(baseDonut));
    const cards = [
      { icon: "i-Add-User", title: String(res.sumuser ?? 0), subtitle: "users" },
      { icon: "i-Monitor-5", title: String(res.sumtransaction ?? 0), subtitle: "transaction" },
      { icon: "i-Down", title: String(res.sumincoming ?? 0), subtitle: "incoming" },
      { icon: "i-Up", title: String(res.sumoutgoing ?? 0), subtitle: "outgoing" },
    ];

    bar.datasets[0].data = Array.isArray(res.incomingchart) ? res.incomingchart : [];
    bar.datasets[1].data = Array.isArray(res.outgoingchart) ? res.outgoingchart : [];
    donut.datasets[0].data = Array.isArray(res.transactionchart) ? res.transactionchart : [0, 0];

    setBarData(bar);
    setDonutData(donut);
    setCardList(cards);
    setLoading(true);
  };

  // Hiển thị mock ngay lập tức, sau đó gọi API (nếu thành công sẽ ghi đè)
  useEffect(() => {
    // 1) render ngay mock để UI có số liệu
    applyResponse(MOCK_DASHBOARD);

    // 2) nếu muốn chỉ dùng mock: return sớm
    if (USE_MOCK) return;

    // 3) gọi API thật, overwrite nếu thành công
    apiService
      .sendAPIGet(language?.lang, "/system/getreportdashboard", {})
      .then((result) => {
        if (result?.isSuccess && result?.data) applyResponse(result.data);
        // nếu fail, giữ nguyên mock
      })
      .catch(() => {
        // giữ mock, không làm gì
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language?.lang]);

  const bread2 = useMemo(() => getBreadCrumb(user?.menu, "001"), [user?.menu]);

  return (
    <div>
      <Breadcrumb routeSegments={bread2} language={language?.lang} />
      <div className="separator-breadcrumb border-top"></div>

      {/* Card thống kê */}
      <div className="row">
        {cardList.map((card, idx) => (
          <div key={idx} className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-icon-bg card-icon-bg-primary o-hidden mb-4">
              <div className="card-body text-center">
                <i className={card.icon}></i>
                <div className="content">
                  <p className="text-muted mt-4 mb-0 text-capitalize">
                    {getLangText(card.subtitle, language?.lang)}
                  </p>
                  <p className="lead text-primary text-24 mb-2 text-capitalize">
                    {card.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <SimpleCard title={getLangText("thisyeartransaction", language?.lang)} className="mb-4">
            <div style={{ height: "350px" }}>
              <ComparisonChart data={barData} loading={!loading} />
            </div>
          </SimpleCard>
        </div>
        <div className="col-lg-6 col-md-6">
          <SimpleCard title={getLangText("thisyeartransaction", language?.lang)} className="mb-4">
            <div style={{ height: "350px" }}>
              <DoughnutChart data={donutData} loading={!loading} />
            </div>
          </SimpleCard>
        </div>
      </div>
    </div>
  );
}
