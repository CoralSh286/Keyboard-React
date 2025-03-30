const convertToReactElements = (data) => {
    if (Array.isArray(data)) {
      return data.map((item, index) => (
        <span key={index} style={item.style || {}}>
          {item.text || ""}
        </span>
      ));
    }

    if (data && typeof data === "object" && data.text !== undefined) {
      return <span style={data.style || {}}>{data.text || ""}</span>;
    }

    return data;
  };
  export default convertToReactElements;