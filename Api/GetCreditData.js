import axios from "axios";

export default class GetCreditData {
    static async getCreditDataByNumber(cardNumber) {
        try {
            const response = axios.post('https://6227-178-93-236-50.ngrok.io/getData', {
                accountNo: cardNumber

            })
            return response

        } catch (error) {
            console.error(error);
        }
    }
}
