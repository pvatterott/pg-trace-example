import * as express from 'express';
import * as knex from 'knex';

const router = express.Router();

router.get('/callback/text-only-knex-await', async (req, res) => {
    try {
        const queryRes = await (req.app.locals.knex as knex)
            .select(req.app.locals.knex.raw('NOW() as now'));
        return res.json({
            status: 'ok',
            timestamp: queryRes[0],
        });
    } catch (err) {
        console.log('DISASTER!!');
        console.log(err.message);
        return res.sendStatus(500);
    }
});

router.get('/callback/text-only-knex-promise', (req, res) => {
    (req.app.locals.knex as knex)
        .select(req.app.locals.knex.raw('NOW() as now'))
        .then((queryRes) => {
            return res.json({
                status: 'ok',
                timestamp: queryRes[0],
            });
        }).catch((err) => {
            console.log('DISASTER!!');
            console.log(err.message);
            return res.sendStatus(500);
        });
});

router.get('/callback/text-only-pg-await', async (req, res) => {
    try {
        const queryRes = await req.app.locals.pg.query('SELECT NOW() as now');
        return res.json({
            status: 'ok',
            timestamp: queryRes.rows[0],
        });
    } catch (err) {
        console.log('DISASTER!!');
        console.log(err.message);
        return res.sendStatus(500);
    }
});

router.get('/callback/text-only-pg-promise', (req, res) => {
    return req.app.locals.pg.query('SELECT NOW() as now', (err, resp) => {
        if (err) {
            console.log('DISASTER!!');
            console.log(err.message);
        }
        return res.status(200).send({
            status: 'ok',
            timestamp: resp.rows[0],
        });
    });
});

export default router;
