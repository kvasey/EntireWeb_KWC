const functions = require('firebase-functions');

const STRIPE_TEST_KEY = 'sk_test_2tGlJRL6VBe0xPoqIvXYRIEJ';
const STRIPE_LIVE_KEY = 'sk_live_mSX1vcJMfIM9ejin09iegV7F';

exports.stripe = functions.https.onRequest((request, response) => {
	console.log(request);
	console.log(request.body);

	//     console.log(new Date());
	//   console.log(ctx.query);
	//   stripe(ctx.secrets.STRIPE_SECRET).charges.create({
	//     currency: ctx.query.currency,
	//     amount: ctx.query.amount,
	//     description: ctx.query.description,
	//     source: ctx.query.token,
	// }, function(err, charge) {
	//     console.log(err, charge);
	//     cb(null, {charge: charge || err});
	// });
	// }
	response.send('Hello from Firebase!');
});
