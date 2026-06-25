import test from '@playwright/test'

test('Upload Payload', async ({ request }) => {
    
    const BookingPayload = {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }

    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: BookingPayload
    })

    // basic assertion to ensure request succeeded
    if (response.status() !== 200 && response.status() !== 201) {
        throw new Error(`Unexpected response status: ${response.status()}`)
    }

    console.log( await response.json())
})

