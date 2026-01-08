import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// --- Constants & Theme ---
const COLORS = {
  primary: "#ff9900", // Orange
  secondary: "#146eb4", // Blue
  dark: "#2c3e50",
  text: "#333333",
  lightGrey: "#f8f9fa",
  border: "#dddddd",
  white: "#ffffff"
};

const BREAKPOINTS = {
  mobile: 768
};

// --- Data Content ---
const TOC_ITEMS = [
  { id: "intro", label: "1. Giới thiệu về Wavecontrol" },
  { id: "solution", label: "2. Giải pháp MonitEM" },
  { id: "features", label: "2.2. Tính năng nổi bật" },
  { id: "architecture", label: "2.3. Mô hình lắp đặt" },
  { id: "probes", label: "2.4. Các đầu đo trường" },
  { id: "projects", label: "2.5. Dự án thực tế", subItems: [
    { id: "telecom", label: "Lĩnh vực viễn thông" },
    { id: "tunisia", label: "Tunisia (ANF)" },
    { id: "qatar", label: "Qatar (World Cup 2022)" },
    { id: "serbia", label: "Xéc-bi-a (RATEL)" },
    { id: "brazil", label: "Brazil (Anatel)" },
    { id: "colombia", label: "Colombia" },
    { id: "turkey", label: "Thổ Nhĩ Kỳ" },
  ]}
];

// --- Components ---

// 1. Image Component with Caption
const Figure = ({ src, caption, alt }: { src: string, caption?: string, alt: string }) => (
  <figure style={{ margin: "30px 0", textAlign: "center" }}>
    <img 
      src={src} 
      alt={alt} 
      style={{ 
        maxWidth: "100%", 
        height: "auto", 
        border: `1px solid ${COLORS.border}`,
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }} 
    />
    {caption && (
      <figcaption style={{ 
        marginTop: "10px", 
        fontSize: "0.9rem", 
        color: "#666", 
        fontStyle: "italic",
        borderBottom: `2px solid ${COLORS.primary}`,
        display: "inline-block",
        paddingBottom: "4px"
      }}>
        {caption}
      </figcaption>
    )}
  </figure>
);

// 2. Data Table Component
const SpecsTable = () => (
  <div style={{ overflowX: "auto", margin: "30px 0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
      <thead>
        <tr style={{ backgroundColor: COLORS.secondary, color: COLORS.white }}>
          <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Loại đầu đo</th>
          <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Model</th>
          <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Dải tần số / Đặc điểm</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={1} style={{ padding: "10px", border: "1px solid #ddd", fontWeight: "bold" }}>Thấp tần</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>WP50</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>10 Hz – 3 kHz (Trường E & H)</td>
        </tr>
        <tr>
          <td rowSpan={4} style={{ padding: "10px", border: "1px solid #ddd", fontWeight: "bold" }}>Cao tần</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>WPF3 / 6 / 8</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>100 kHz – 3, 6, 8 GHz</td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>WPF18</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>300 kHz – 18 GHz</td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>WPF40</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>1 MHz – 40 GHz</td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>WPF60</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>1 MHz – 60 GHz (Trường E)</td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #ddd", fontWeight: "bold" }}>Di động</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>Băng tần di động</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>GSM, UMTS, LTE (Trường E)</td>
        </tr>
        <tr>
          <td style={{ padding: "10px", border: "1px solid #ddd", fontWeight: "bold" }}>Từ trường</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>Probes H</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>300 kHz – 1 GHz (Trường H)</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// 3. Main Article Component
const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < BREAKPOINTS.mobile);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset for sticky header if needed, or simple scroll
      const yOffset = -20; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      if (isMobile) setTocOpen(false);
    }
  };

  return (
    <div style={{ fontFamily: '"Roboto", sans-serif', color: COLORS.text, lineHeight: "1.6" }}>
      {/* Header Branding */}
      <header style={{ 
        borderBottom: `4px solid ${COLORS.secondary}`, 
        padding: "20px", 
        backgroundColor: COLORS.white,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "1.8rem", fontWeight: "900", color: COLORS.secondary, lineHeight: 1 }}>TECOTEC</span>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: COLORS.primary, letterSpacing: "3px" }}>GROUP</span>
          </div>
          <div style={{ fontSize: "0.9rem", color: "#666", fontWeight: "500", display: isMobile ? "none" : "block" }}>
            GIẢI PHÁP CÔNG NGHỆ & ĐO LƯỜNG
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px", display: "flex", gap: "40px", flexDirection: isMobile ? "column" : "row" }}>
        
        {/* Left Sidebar: Table of Contents */}
        <aside style={{ 
          flex: "0 0 280px", 
          position: isMobile ? "relative" : "sticky",
          top: isMobile ? 0 : "100px",
          height: "fit-content",
          zIndex: 90
        }}>
          <div style={{ 
            backgroundColor: COLORS.lightGrey, 
            padding: "20px", 
            borderRadius: "8px", 
            borderLeft: `4px solid ${COLORS.primary}` 
          }}>
            <div 
              onClick={() => isMobile && setTocOpen(!tocOpen)}
              style={{ 
                fontSize: "1.1rem", 
                fontWeight: "bold", 
                color: COLORS.secondary, 
                marginBottom: isMobile && !tocOpen ? 0 : "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: isMobile ? "pointer" : "default"
              }}
            >
              MỤC LỤC NỘI DUNG
              {isMobile && <span>{tocOpen ? "−" : "+"}</span>}
            </div>
            
            {(!isMobile || tocOpen) && (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {TOC_ITEMS.map((item) => (
                  <li key={item.id} style={{ marginBottom: "10px" }}>
                    <a 
                      onClick={() => scrollTo(item.id)}
                      style={{ 
                        textDecoration: "none", 
                        color: "#444", 
                        fontSize: "0.95rem", 
                        cursor: "pointer",
                        display: "block",
                        padding: "4px 0",
                        fontWeight: "500"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#444"}
                    >
                      {item.label}
                    </a>
                    {item.subItems && (
                      <ul style={{ listStyle: "none", paddingLeft: "15px", marginTop: "5px", borderLeft: "2px solid #ddd" }}>
                        {item.subItems.map(sub => (
                          <li key={sub.id} style={{ marginBottom: "5px" }}>
                             <a 
                                onClick={() => scrollTo(sub.id)}
                                style={{ 
                                  textDecoration: "none", 
                                  color: "#666", 
                                  fontSize: "0.85rem", 
                                  cursor: "pointer",
                                  display: "block",
                                  padding: "2px 0"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                                onMouseLeave={(e) => e.currentTarget.style.color = "#666"}
                              >
                                {sub.label}
                              </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, minWidth: 0 }}>
          
          {/* Article Header */}
          <div style={{ marginBottom: "40px", borderBottom: `1px solid ${COLORS.border}`, paddingBottom: "20px" }}>
            <h1 style={{ fontSize: isMobile ? "1.8rem" : "2.4rem", color: COLORS.secondary, fontWeight: "800", marginBottom: "20px" }}>
              GIẢI PHÁP GIÁM SÁT LIÊN TỤC TRƯỜNG ĐIỆN TỪ (EMF) TRONG KHU VỰC - MONITEM
            </h1>
            <div style={{ color: "#777", fontStyle: "italic", fontSize: "0.95rem" }}>
              Giải pháp từ hãng Wavecontrol (Tây Ban Nha) - Phân phối bởi TECOTEC Group
            </div>
          </div>

          {/* Section 1: Intro */}
          <section id="intro" style={{ marginBottom: "50px" }}>
            <h2 style={{ color: COLORS.primary, borderBottom: `2px solid ${COLORS.border}`, paddingBottom: "10px" }}>1. GIỚI THIỆU VỀ WAVECONTROL</h2>
            <p>
              <strong>Wavecontrol</strong> được thành lập năm 1997, là một công ty tiên phong trong lĩnh vực đo điện từ trường. 
              Công ty có trụ sở chính tại Châu Âu (Barcelona, Tây Ban Nha) và Hoa Kỳ (New Jersey).
            </p>
            <p>
              Mạng lưới các nhà phân phối của Wavecontrol trải rộng hơn 80 quốc gia trên toàn bộ 5 châu lục. 
              Trong đó tại thị trường Việt Nam, <strong>TECOTEC Group</strong> là nhà phân phối độc quyền các sản phẩm của Wavecontrol.
            </p>
            <div style={{ backgroundColor: "#eef6fc", padding: "20px", borderRadius: "8px", margin: "20px 0" }}>
              <strong>Lĩnh vực hoạt động chính:</strong>
              <ul style={{ marginTop: "10px" }}>
                <li><strong>An toàn trường điện từ (RF/EMF Safety):</strong> Với gần 30 năm kinh nghiệm, Wavecontrol phát triển các thiết bị đo lường, giám sát mức độ phơi nhiễm EMF. Tất cả thiết bị đều đạt chuẩn và được hiệu chuẩn theo ISO 17025.</li>
                <li><strong>Hệ thống kiểm tra:</strong> Cung cấp linh kiện, thiết bị và hệ thống kiểm tra điện, tương thích điện từ trường (EMC), an toàn điện và đo ăng ten.</li>
              </ul>
            </div>
            <Figure 
              src="https://placehold.co/800x400/146eb4/ffffff?text=Wavecontrol+Lab+&+R%26D" 
              caption="Phòng thí nghiệm và kiểm chuẩn của Wavecontrol tại Tây Ban Nha"
              alt="Wavecontrol Lab"
            />
          </section>

          {/* Section 2: Solution Overview */}
          <section id="solution" style={{ marginBottom: "50px" }}>
            <h2 style={{ color: COLORS.primary, borderBottom: `2px solid ${COLORS.border}`, paddingBottom: "10px" }}>2. GIẢI PHÁP MONITEM - TỔNG QUAN</h2>
            <p>
              Một trong những giải pháp nổi bật của Wavecontrol là hệ thống <strong>MonitEM</strong>. 
              Hệ thống cho phép giám sát các mức trường điện từ trong khu vực liên tục 24/7, suốt 365 ngày. 
              Giải pháp này giúp xác minh sự tuân thủ các tiêu chuẩn an toàn (ICNIRP, FCC, SC6, v.v.) do cơ quan có thẩm quyền thiết lập, 
              nhằm giảm thiểu nguy cơ phơi nhiễm hoặc cảnh báo người dân.
            </p>
            
            <h3 style={{ color: COLORS.secondary, fontSize: "1.3rem", marginTop: "30px" }}>Các thành phần chính của hệ thống:</h3>
            <ul style={{ lineHeight: "1.8" }}>
              <li>
                <strong>Trạm giám sát MonitEM:</strong> Đặt gần các nguồn trường điện từ (ăng-ten, trạm gốc, đường dây điện) hoặc khu vực nhạy cảm (trường học, bệnh viện). 
                Trạm lấy mẫu liên tục, lưu trữ tạm thời và truyền dữ liệu về trung tâm.
              </li>
              <li>
                <strong>Trung tâm điều khiển:</strong> Quản lý các trạm giám sát, nhận dữ liệu qua Internet. 
                Cho phép người dùng được ủy quyền kiểm tra trạng thái từ bất kỳ đâu.
              </li>
              <li>
                <strong>Web công cộng (Tùy chọn):</strong> Công bố dữ liệu cho người dân theo dõi mức độ phơi nhiễm trong khu vực sinh sống.
              </li>
            </ul>
             <Figure 
              src="https://placehold.co/800x500/ff9900/ffffff?text=Tram+Giam+Sat+MonitEM" 
              caption="Trạm giám sát MonitEM được lắp đặt thực tế gần khu dân cư"
              alt="MonitEM Station"
            />
          </section>

          {/* Section 2.2: Features */}
          <section id="features" style={{ marginBottom: "50px" }}>
             <h2 style={{ color: COLORS.primary, borderBottom: `2px solid ${COLORS.border}`, paddingBottom: "10px" }}>2.2. TÍNH NĂNG NỔI BẬT</h2>
             <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px", marginTop: "20px" }}>
                <div style={{ border: "1px solid #eee", padding: "15px", borderRadius: "4px" }}>
                  <h4 style={{ margin: "0 0 10px 0", color: COLORS.secondary }}>Tuân thủ chuẩn quốc tế</h4>
                  <p style={{ fontSize: "0.95rem", margin: 0 }}>Phù hợp với khuyến nghị <strong>ITU-K.83</strong> về tiêu chuẩn thực hiện các mạng đo lường EMF.</p>
                </div>
                <div style={{ border: "1px solid #eee", padding: "15px", borderRadius: "4px" }}>
                  <h4 style={{ margin: "0 0 10px 0", color: COLORS.secondary }}>Hoạt động 24/7/365</h4>
                  <p style={{ fontSize: "0.95rem", margin: 0 }}>Giám sát liên tục không gián đoạn, đảm bảo dữ liệu luôn được cập nhật.</p>
                </div>
                <div style={{ border: "1px solid #eee", padding: "15px", borderRadius: "4px" }}>
                  <h4 style={{ margin: "0 0 10px 0", color: COLORS.secondary }}>Kết nối không dây</h4>
                  <p style={{ fontSize: "0.95rem", margin: 0 }}>Tích hợp Modem GPRS/3G/4G cho phép liên lạc hai chiều với trung tâm điều khiển.</p>
                </div>
                <div style={{ border: "1px solid #eee", padding: "15px", borderRadius: "4px" }}>
                  <h4 style={{ margin: "0 0 10px 0", color: COLORS.secondary }}>Nguồn năng lượng linh hoạt</h4>
                  <p style={{ fontSize: "0.95rem", margin: 0 }}>Tùy chọn tấm pin năng lượng mặt trời giúp trạm hoạt động độc lập ở mọi vị trí.</p>
                </div>
                <div style={{ border: "1px solid #eee", padding: "15px", borderRadius: "4px" }}>
                  <h4 style={{ margin: "0 0 10px 0", color: COLORS.secondary }}>Bền bỉ (IP66)</h4>
                  <p style={{ fontSize: "0.95rem", margin: 0 }}>Thiết kế chống bụi, chống nước IP66, chịu được điều kiện thời tiết khắc nghiệt ngoài trời.</p>
                </div>
                 <div style={{ border: "1px solid #eee", padding: "15px", borderRadius: "4px" }}>
                  <h4 style={{ margin: "0 0 10px 0", color: COLORS.secondary }}>Web Server thông minh</h4>
                  <p style={{ fontSize: "0.95rem", margin: 0 }}>Cấu hình từ xa, quản lý cảnh báo, tạo báo cáo và so sánh với các giới hạn tiêu chuẩn (ICNIRP 98, FCC, SC6...).</p>
                </div>
             </div>
          </section>

          {/* Section 2.3: Architecture */}
          <section id="architecture" style={{ marginBottom: "50px" }}>
             <h2 style={{ color: COLORS.primary, borderBottom: `2px solid ${COLORS.border}`, paddingBottom: "10px" }}>2.3. MÔ HÌNH LẮP ĐẶT HỆ THỐNG</h2>
             <p>
               Mô hình điển hình bao gồm các trạm thu thập dữ liệu tại hiện trường (Nguồn EMF -> Ăng ten/Probe -> MonitEM), 
               truyền tín hiệu qua mạng di động về Trung tâm điều khiển (Server thu nhận, phân tích).
             </p>
             <Figure 
              src="https://placehold.co/900x400/f4f6f8/333333?text=So+Do+Nguyen+Ly+He+Thong+MonitEM" 
              caption="Sơ đồ nguyên lý hoạt động: Nguồn EMF -> MonitEM -> Trung tâm điều khiển"
              alt="System Architecture"
            />
          </section>

          {/* Section 2.4: Probes */}
          <section id="probes" style={{ marginBottom: "50px" }}>
             <h2 style={{ color: COLORS.primary, borderBottom: `2px solid ${COLORS.border}`, paddingBottom: "10px" }}>2.4. CÁC ĐẦU ĐO TRƯỜNG TRÊN MONITEM</h2>
             <p>Hệ thống hỗ trợ nhiều loại đầu đo để đáp ứng các dải tần số khác nhau:</p>
             <SpecsTable />
             <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                <img src="https://placehold.co/200x200/ddd/333?text=Probe+WP50" alt="Probe WP50" style={{ borderRadius: "8px" }} />
                <img src="https://placehold.co/200x200/ddd/333?text=Probe+WPF" alt="Probe WPF" style={{ borderRadius: "8px" }} />
                <img src="https://placehold.co/200x200/ddd/333?text=Mobile+Probe" alt="Mobile Probe" style={{ borderRadius: "8px" }} />
             </div>
          </section>

          {/* Section 2.5: Projects */}
          <section id="projects" style={{ marginBottom: "50px" }}>
             <h2 style={{ color: COLORS.primary, borderBottom: `2px solid ${COLORS.border}`, paddingBottom: "10px" }}>2.5. CÁC DỰ ÁN ĐÃ TRIỂN KHAI THỰC TẾ</h2>
             
             {/* Telecom */}
             <div id="telecom" style={{ marginBottom: "40px" }}>
               <h3 style={{ color: COLORS.secondary }}>2.5.1. Ứng dụng trong lĩnh vực viễn thông</h3>
               <p>
                 Các hệ thống điện thoại di động và phát sóng là nguồn bức xạ chính. Các phép đo thường sử dụng đầu dò trường E (ví dụ WPF8) cho điều kiện trường xa 
                 hoặc đầu dò trường H cho tần số thấp (trường gần).
               </p>
               <p><strong>Tiêu chuẩn tham chiếu:</strong> IEC 62232, EN 50492 (trạm gốc), EN 50401 (thiết bị vô tuyến).</p>
               <Figure 
                  src="https://placehold.co/800x350/2c3e50/ffffff?text=Xe+Co+Dong+Do+Kiem+EMF" 
                  caption="Giải pháp đo kiểm lắp đặt trên xe cơ động (Drive Test) tạo bản đồ toàn diện cho thành phố."
                  alt="Drive Test"
                />
             </div>

             {/* Tunisia */}
             <div id="tunisia" style={{ marginBottom: "40px", backgroundColor: "#fcfcfc", padding: "20px", borderLeft: `4px solid ${COLORS.secondary}` }}>
               <h3 style={{ color: COLORS.secondary, marginTop: 0 }}>2.5.2. Tunisia (Cơ quan ANF)</h3>
               <p>
                 Dự án triển khai <strong>16 trạm MonitEM</strong> và 3 bộ thiết bị di động SMP2. 
                 Với sự xuất hiện của 5G, cơ quan ANF kiểm soát chặt chẽ và công khai thông tin minh bạch trên website.
               </p>
               <p>
                 Người dân có thể truy cập website công cộng hoặc ứng dụng điện thoại để xem mức độ phơi nhiễm tại vị trí của mình so với giới hạn quy định.
               </p>
               <Figure 
                  src="https://placehold.co/800x400/e70013/ffffff?text=Tunisia+Public+Map+Interface" 
                  caption="Giao diện bản đồ giám sát công khai tại Tunisia"
                  alt="Tunisia Map"
                />
             </div>

             {/* Qatar */}
             <div id="qatar" style={{ marginBottom: "40px" }}>
               <h3 style={{ color: COLORS.secondary }}>2.5.3. Qatar (FIFA World Cup 2022)</h3>
               <p>
                 Dự án do Bộ đô thị và môi trường (MME) thực hiện. Đây là dự án đầu tiên trong khu vực nhằm đánh giá quy định hiện hành chuẩn bị cho <strong>FIFA World Cup 2022</strong>.
               </p>
               <ul style={{ backgroundColor: "#fff3e0", padding: "15px 15px 15px 30px", borderRadius: "4px" }}>
                 <li><strong>Quy mô:</strong> 40 trạm MonitEM + WP60.</li>
                 <li><strong>Thiết bị cầm tay:</strong> 20 bộ SMP2 + WPF60 + WP400.</li>
                 <li><strong>Xe cơ động:</strong> Hệ thống MapEM tìm kiếm các "điểm nóng".</li>
               </ul>
                <Figure 
                  src="https://placehold.co/800x400/800000/ffffff?text=Qatar+Stadium+Monitoring" 
                  caption="Giám sát EMF tại sân vận động và không gian công cộng tại Qatar"
                  alt="Qatar Stadium"
                />
             </div>

             {/* Serbia */}
             <div id="serbia" style={{ marginBottom: "40px" }}>
               <h3 style={{ color: COLORS.secondary }}>2.5.4. Xéc-bi-a (RATEL)</h3>
               <p>
                 Cơ quan quản lý truyền thông điện tử (RATEL) bắt đầu dự án từ năm 2016.
                 Hệ thống bao gồm <strong>30 trạm MonitEM</strong> và các đầu đo WPF8, tạo thành mạng lưới giám sát quốc gia.
               </p>
             </div>

             {/* Brazil */}
             <div id="brazil" style={{ marginBottom: "40px", backgroundColor: "#fcfcfc", padding: "20px", borderLeft: `4px solid ${COLORS.secondary}` }}>
               <h3 style={{ color: COLORS.secondary, marginTop: 0 }}>2.5.5. Brazil (Anatel)</h3>
               <p>
                 Cơ quan Viễn thông Quốc gia Brazil (Anatel) đã tăng gấp đôi năng lực đánh giá EMF để phục vụ <strong>World Cup 2014</strong> và <strong>Olympics</strong>.
                 Hệ thống đảm bảo độ tin cậy khi sử dụng nguồn tài nguyên phổ tần.
               </p>
               <ul>
                 <li><strong>Quy mô:</strong> 66 trạm thiết bị (MonitEM + MapEM).</li>
                 <li><strong>Đặc điểm:</strong> Lắp đặt tạm thời tại sân vận động (dùng tripod) và cố định.</li>
                 <li><strong>Cam kết:</strong> Bảo hành 5 năm, thay thế thiết bị trong 15 ngày.</li>
               </ul>
                <Figure 
                  src="https://placehold.co/800x400/009c3b/ffffff?text=Brazil+Stadium+Setup" 
                  caption="Lắp đặt thiết bị đo liên tục trong suốt quá trình diễn ra sự kiện thể thao"
                  alt="Brazil Project"
                />
             </div>

             {/* Colombia */}
             <div id="colombia" style={{ marginBottom: "40px" }}>
               <h3 style={{ color: COLORS.secondary }}>2.5.6. Colombia</h3>
               <p>
                 Mục tiêu đo lường và kiểm soát bức xạ viễn thông nhằm giảm lo ngại của người dân, hỗ trợ tăng tốc triển khai mạng 4G.
               </p>
               <p><strong>Quy mô:</strong> 43 trạm tại 10 thành phố lớn.</p>
             </div>

             {/* Turkey */}
             <div id="turkey" style={{ marginBottom: "40px" }}>
               <h3 style={{ color: COLORS.secondary }}>2.5.7. Thổ Nhĩ Kỳ</h3>
               <p>
                 Triển khai mạng lưới cảm biến rộng khắp lãnh thổ từ tháng 8/2013.
                 Các trạm được lắp đặt tại trường học, bệnh viện, cao ốc. Kết quả đo được công bố trực tuyến tại website chính phủ.
               </p>
               <Figure 
                  src="https://placehold.co/800x400/e30a17/ffffff?text=Turkey+Sensor+Network" 
                  caption="Bản đồ vị trí các trạm giám sát thí điểm tại Thổ Nhĩ Kỳ"
                  alt="Turkey Map"
                />
             </div>

          </section>

          {/* Conclusion / Contact Block inside article */}
          <div style={{ 
            backgroundColor: COLORS.secondary, 
            color: COLORS.white, 
            padding: "40px", 
            borderRadius: "8px", 
            textAlign: "center",
            marginTop: "60px"
          }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>LIÊN HỆ TƯ VẤN GIẢI PHÁP</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "30px" }}>
              TECOTEC Group cam kết cung cấp giải pháp Wavecontrol chính hãng, hỗ trợ kỹ thuật chuyên sâu và dịch vụ sau bán hàng chuyên nghiệp.
            </p>
            <div style={{ fontSize: "1rem", lineHeight: "1.8" }}>
              <p><strong>CÔNG TY CỔ PHẦN TECOTEC GROUP</strong></p>
              <p>📍 Tầng 2, Tòa nhà CT3A, KĐT Mễ Trì Thượng, Nam Từ Liêm, Hà Nội</p>
              <p>🌐 <a href="http://www.tecotec.com.vn" style={{ color: "#fff", textDecoration: "underline" }}>www.tecotec.com.vn</a></p>
            </div>
          </div>

        </main>
      </div>
      
      {/* Footer */}
      <footer style={{ backgroundColor: "#222", color: "#888", padding: "20px", textAlign: "center", fontSize: "0.85rem" }}>
        &copy; 2024 TECOTEC GROUP. All rights reserved.
      </footer>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
