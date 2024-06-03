import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Placeholder, Card } from "semantic-ui-react";

function CardLoading(props) {
  const { actionTypes } = props;

  switch (actionTypes) {
    case "post":
      return (
        <Placeholder
          fluid
          style={{
            border: "30px solid white",
            borderRadius: 10,
            width: 620,
            marginLeft: 40,
          }}
        >
          <Placeholder.Header
            image
            style={{
              backgroundColor: "rgb(236 236 236)",
              border: "1px solid white",
              zIndex: 1,
            }}
          >
            <Placeholder.Line length="very short" />
            <Placeholder.Line />
            <Placeholder.Line length="very short" />
          </Placeholder.Header>
          <Placeholder.Paragraph
            style={{
              width: "100%",
              height: 500,
            }}
          ></Placeholder.Paragraph>
          <Placeholder.Line style={{ height: "30px" }} />
          <Placeholder.Line style={{ height: "30px" }} />
          <Placeholder.Line style={{ height: "30px" }} />
          <Placeholder.Line style={{ height: "30px" }} />
        </Placeholder>
      );
    case "personal":
      return (
        <div style={{ marginTop: "10%", marginLeft: "8%" }}>
          <div
            style={{
              width: "1000px",
              height: "100%",
              display: "flex",
              paddingTop: "5%",
            }}
          >
            <div style={{ width: "30%", height: "100%" }}>
              <Placeholder
                style={{ height: 150, width: 150, borderRadius: "50%" }}
              >
                <Placeholder.Image />
              </Placeholder>
            </div>
            <div
              style={{
                width: "70%",
                height: "100%",
                marginBottom: "20%",
              }}
            >
              <Placeholder>
                <Placeholder.Line
                  style={{
                    height: "20px",
                    backgroundColor: "rgb(240, 242, 245)",
                  }}
                />{" "}
                <Placeholder.Line
                  style={{
                    height: "20px",
                    backgroundColor: "rgb(240, 242, 245)",
                  }}
                />{" "}
                <Placeholder.Line
                  style={{
                    height: "20px",
                    backgroundColor: "rgb(240, 242, 245)",
                  }}
                />{" "}
                <Placeholder.Line
                  style={{
                    height: "20px",
                    backgroundColor: "rgb(240, 242, 245)",
                  }}
                />{" "}
                <Placeholder.Line
                  style={{
                    height: "20px",
                    backgroundColor: "rgb(240, 242, 245)",
                  }}
                />
              </Placeholder>
            </div>
          </div>
          <div
            style={{
              width: "1000px",
              height: "100%",
            }}
          >
            <Card.Group itemsPerRow={3}>
              <Card>
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                </Card.Content>
              </Card>
            </Card.Group>
          </div>
        </div>
      );
    case "suggested":
      return (
        <div
          style={{
            width: "100%",
            height: "70px",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "30%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Placeholder style={{ width: 60, height: 60, borderRadius: "50%" }}>
              <Placeholder.Image />
            </Placeholder>
          </div>
          <div
            style={{ width: "70%", height: "100%", backgroundColor: "purple" }}
          >
            <Placeholder
              style={{ borderBottom: "13px solid rgb(240, 242, 245)" }}
            >
              <Placeholder.Line
                style={{ backgroundColor: "rgb(240, 242, 245)" }}
              />
              <Placeholder.Line
                style={{ backgroundColor: "rgb(240, 242, 245)" }}
              />
              <Placeholder.Line
                style={{ backgroundColor: "rgb(240, 242, 245)" }}
              />
            </Placeholder>
          </div>
        </div>
      );
    case "detailsPost":
      return (
        <Placeholder
          fluid
          style={{
            border: "20px solid white",
            borderRadius: 10,
            position: "absolute",
            width: 800,
            height: 600,
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            margin: "auto",
            display: "flex",
          }}
        >
          <Placeholder.Paragraph
            style={{
              width: "60%",
              height: "100%",
              borderRight: "10px solid white",
              borderTop: "5px solid white",
            }}
          ></Placeholder.Paragraph>
          <Placeholder.Paragraph
            style={{
              width: "40%",
              height: "104%",
              marginTop: "-19px",
            }}
          >
            <Placeholder.Paragraph
              style={{
                width: "100%",
                height: "15%",
                border: "5px solid white",
              }}
            ></Placeholder.Paragraph>
            <Placeholder.Paragraph
              style={{
                width: "100%",
                height: "60%",
                border: "5px solid white",
              }}
            ></Placeholder.Paragraph>
            <Placeholder.Paragraph
              style={{
                width: "100%",
                height: "25%",
                border: "5px solid white",
              }}
            ></Placeholder.Paragraph>
          </Placeholder.Paragraph>
        </Placeholder>
      );
    default:
      return (
        <Placeholder
          fluid
          style={{ border: "20px solid white", borderRadius: 10 }}
        >
          <Placeholder.Header
            image
            style={{
              backgroundColor: "rgb(236 236 236)",
              border: "none",
              zIndex: 1,
            }}
          >
            <Placeholder.Line length="very short" />
            <Placeholder.Line />
            <Placeholder.Line length="very short" />
          </Placeholder.Header>
          <Placeholder.Paragraph
            style={{ width: "100%", height: 467 }}
          ></Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder>
      );
  }
}

export default CardLoading;
