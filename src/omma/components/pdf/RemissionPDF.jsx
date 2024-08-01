import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/images/logo-name.png";
import footer from "../../assets/images/footer.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    // borderStyle: "solid",
    // borderWidth: 3,
    // borderLeftColor: "#9263CD",
    // borderRightColor: "#A3C4EF",
    // borderTopColor: "#9263CD",
    // borderBottomColor: "#FC647D",
    fontSize: 10,
    position: "relative",
  },
  image: {
    width: 200,
    marginHorizontal: "auto",
  },
  informacion: {
    marginTop: 16,
    flexDirection: "column",
    gap: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#8897AE",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "33.33333333%",
    borderStyle: "solid",
    borderColor: "#8897AE",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 8,
  },
  // Firma
  sectionFirma: {
    width: "80%",
    marginHorizontal: "auto",
    marginVertical: 32,
    flexDirection: "row",
    gap: 16,
  },
  sectionFirmaItem: {
    width: "50%",
    textAlign: "center",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderTopColor: "#000",
    padding: 8,
  },
  qrCode: {
    width: 100,
    height: 100,
    marginHorizontal: "auto",
  },
});

// Create Document Component
function RemissionPDF({ remission }) {
  return (
    <Document>
      <Page style={styles.page}>
          <Image src={logo} style={styles.image} />
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              marginTop: 32,
            }}
          >
            REMISIÓN DE SALIDA DE MATERIAL - CONTROL INTERNO
          </Text>
          <View style={styles.informacion}>
            <Text>Cliente: {remission?.client}</Text>
            <Text>Folio: {remission?.codigo}</Text>
            <Text>Encargado de almacén: {remission?.encargado}</Text>
            <Text>Hospital: {remission?.hospitals?.name}</Text>
          </View>

          <View
            style={{
              marginVertical: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                marginBottom: 8,
              }}
            >
              Componentes en la remisión:
            </Text>
            <View style={styles.table}>
              <View
                style={{
                  backgroundColor: "#A3C4EF",
                  fontWeight: "bold",
                }}
              >
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Medidas</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Categoria</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Cantidad</Text>
                  </View>
                </View>
              </View>
              {remission?.componentes_has_componentes_remisiones?.map(
                (remission) => (
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {remission.componentes.measures}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {remission.componentes.componentes_categories.name}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{remission.quantity}</Text>
                    </View>
                  </View>
                )
              )}
            </View>
          </View>

          <View>
            <View style={{ marginBottom: 40 }}>
              <Text style={{ marginBottom: 8 }}>Salida:</Text>
              <Text>- Material completo.</Text>
              <Text>- Material en buen estado.</Text>
              <Text>- Instrumental limpio.</Text>
              <Text>- Baterías cargadas.</Text>
            </View>

            <View style={styles.sectionFirma}>
              <View style={styles.sectionFirmaItem}>
                <Text>Nombre y firma del encargado de almacén</Text>
              </View>

              <View style={styles.sectionFirmaItem}>
                <Text>Nombre y firma del cliente</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={{ marginBottom: 40 }}>
              <Text style={{ marginBottom: 8 }}>Reingreso:</Text>
              <Text>- Material completo.</Text>
              <Text>- Material en buen estado.</Text>
              <Text>- Instrumental limpio.</Text>
            </View>

            <View style={styles.sectionFirma}>
              <View style={styles.sectionFirmaItem}>
                <Text>Nombre y firma del encargado de almacén</Text>
              </View>

              <View style={styles.sectionFirmaItem}>
                <Text>Nombre y firma del cliente</Text>
              </View>
            </View>
          </View>
          <Image
            src={footer}
            style={{
              width: "100%",
              position: "absolute",
              bottom: 60,
              left: 20,
              right: 20,
            }}
          />
      </Page>
    </Document>
  );
}

export default RemissionPDF;
