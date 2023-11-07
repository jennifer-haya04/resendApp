"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resend_1 = require("resend");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
dotenv_1.default.config({ path: "../.env" });
const id = process.env.RESENDID;
const resend = new resend_1.Resend(id);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", router);
app.listen(process.env.PORT, () => {
    console.log('Listening on http://localhost:' + process.env.PORT);
});
router.post('/contact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.firstName + req.body.lastName;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;
    try {
        const data = yield resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'jenha04@gmail.com',
            subject: '***Contacto - Portafolio',
            html: `<p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Message: ${message}</p>`,
        });
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
