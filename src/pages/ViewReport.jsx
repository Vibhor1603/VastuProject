import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import toast from "react-hot-toast";
import { FileDown, Loader2 } from "lucide-react";

function ViewReport() {
  const { plan } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [floorreport, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/floorplan/report/getreport/${plan}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setReport(data.report.reports);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching report");
        console.error("Error fetching report:", error);
        setLoading(false);
      }
    };

    fetchReport();
  }, [plan]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-orange-500 text-white p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Floor Plan Report</h1>
          {!loading && floorreport.length > 0 && (
            <PDFDownloadLink
              document={<ReportPDF reports={floorreport} />}
              fileName="floor_plan_report.pdf"
              className="flex items-center space-x-2 bg-white text-orange-500 px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              {({ loading }) => (
                <>
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <FileDown size={20} />
                  )}
                  <span>{loading ? "Preparing PDF..." : "Download PDF"}</span>
                </>
              )}
            </PDFDownloadLink>
          )}
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-orange-500" size={48} />
            </div>
          ) : floorreport.length === 0 ? (
            <div className="text-center text-gray-500">
              No reports available for this floor plan.
            </div>
          ) : (
            <div className="space-y-4">
              {floorreport.map((report, index) => (
                <div
                  key={index}
                  className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg"
                >
                  <h2 className="text-lg font-semibold text-orange-700 mb-2">
                    Room: {report.roomname}
                  </h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium text-orange-600">
                        Remark:
                      </span>{" "}
                      {report.remark}
                    </p>
                    <p>
                      <span className="font-medium text-orange-600">
                        Remedy:
                      </span>{" "}
                      {report.remedy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// PDF Component
const ReportPDF = ({ reports }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Floor Plan Inspection Report</Text>
      </View>
      {reports.map((report, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.roomTitle}>Room: {report.roomname}</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.label}>Remark:</Text>
            <Text style={styles.content}>{report.remark}</Text>
            <Text style={styles.label}>Remedy:</Text>
            <Text style={styles.content}>{report.remedy}</Text>
          </View>
        </View>
      ))}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Generated on {new Date().toLocaleDateString()}
        </Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#FFF5E6",
  },
  header: {
    backgroundColor: "#FF8C00",
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  titleText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2 5 rgba(0,0,0,0.1)",
  },
  sectionHeader: {
    backgroundColor: "#FFA500",
    padding: 10,
  },
  roomTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionContent: {
    padding: 12,
  },
  label: {
    color: "#FF6347",
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "bold",
  },
  content: {
    fontSize: 11,
    marginBottom: 10,
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: "#FF8C00",
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: "#888",
    textAlign: "center",
  },
});

export default ViewReport;
