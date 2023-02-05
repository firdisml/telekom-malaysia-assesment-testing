// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function logout_user(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {


        try {

            const log_user = await axios.post('https://web-assessment.apps.ocp.tmrnd.com.my/api/auth/logout', {

                "loginId": req.body.login_id,

            },
                {
                    headers: { "Content-Type": "application/json", "API-KEY": "firdausfitri010199@gmail.com" },
                })


            res.setHeader(
                "Set-Cookie", [
                `auth=deleted; Max-Age=0; path=/`]
            );

            {/* @ts-ignore*/ }
            res.json({ id: log_user.data.id })

        } catch (error) {

            {/* @ts-ignore*/ }
            res.json({ message: `Error : ${error}` })

        }
    }
}
