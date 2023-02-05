// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie';



export default async function login_user(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {

        const log_user = await axios.post('https://web-assessment.apps.ocp.tmrnd.com.my/api/auth/login', {

            "loginId": req.body.login_id,
            "password": req.body.password

        },
            {
                headers: { "Content-Type": "application/json", "API-KEY": "firdausfitri010199@gmail.com" },
            })


        res.setHeader('Set-Cookie', cookie.serialize('auth', log_user.data.id, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'
        }))

        {/* @ts-ignore*/ }
        res.json({ id: log_user.data.id })
    }
}
