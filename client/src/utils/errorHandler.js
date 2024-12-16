const errorHandler = (err) => {
    /**
     * Function handling most error in the application and raises an alert accordingly.
     * @param {Object} error an error Object. 
     */
    if (err.name = "AxiosError") {
        alert(err.response.data);
    } else if (err.message) {
        alert(err.message);
    } else {
        alert("An error occured");
    }
}

export default errorHandler