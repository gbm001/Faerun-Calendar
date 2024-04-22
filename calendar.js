/* Faerûn Calendar for Roll20
Original created by Kirsty (https://app.roll20.net/users/1165285/kirsty)
Updated by Julexar (https://app.roll20.net/users/9989180/julexar)

GM Commands:
!cal
Displays the Calendar Menu
	--setday --{Insert Number}
	Sets the current day to the number you input
	--setmonth --{Insert Number}
	Sets the current month to the number you input
	--setyear --{Insert Number}
	Sets the current year to the number you input
	--settime --hour --{Insert Number} --minute --{Insert Number}
	Sets the current time to the numbers you input
	--advance --{Insert Number} --{short rest, long rest, hour, minute, day, week, month, year}
	Advances the time by the number/type you input
	--weather
	Randomises the Weather
		--toggle
		Toggles the Weather Display
	--moon
	Resets the Moon Phase
		--phase --{Insert Name/Number}
		Sets the Moon Phase according to the name/number you input
		--toggle
		Toggles the Moon Display
	--show
	Displays the Calendar to the Players
	--reset
	Resets the Calendar to the Default Values

!month --{Insert Name/Number} --{Insert Name}
Renames a Month to the Name you input

!alarm
Displays the Alarm Menu
	--{Insert Number}
	Displays the Alarm Menu for the Alarm you input
		--settile --{Insert Title}
		Sets the Title of the Alarm
		--setdate --{Insert Date}
		Sets the Date of the Alarm (Format: DD.MM.YYYY)
		--settime --{Insert Time}
		Sets the Time of the Alarm (Format: HH:MM [24h])
		--setmessage --{Insert Message}
		Sets the Message of the Alarm
	--new
	Opens the Alarm Creator
		--title --{Insert Title}
		Sets the Title of the Alarm
		--date --{Insert Date}
		Sets the Date of the Alarm (Format: DD.MM.YYYY)
		--time --{Insert Time}
		Sets the Time of the Alarm (Format: HH:MM [24h])
		--message --{Insert Message}
		Sets the Message of the Alarm
	--delete --{Insert Number}
	Deletes the Alarm you input
	--reset
	Resets the Alarms to the Default Values

Player Commands:

!cal
Displays the current Calendar to the Players
*/

const styles = {
	divMenu: 'style="width: 300px; border: 1px solid black; background-color: #ffffff; padding: 5px;"',
	divButton: 'style="text-align:center;"',
	buttonSmall:
		'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 75px;',
	buttonMedium:
		'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;',
	buttonLarge:
		'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;',
	table: 'style="text-align:center; font-size: 12px; width: 100%; border-style: 3px solid #cccccc;"',
	arrow: 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"',
	header: 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"',
	sub: 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"',
	tdReg: 'style="text-align: right;"',
	trTab: 'style="text-align: left; border-bottom: 1px solid #cccccc;"',
	tdTab: 'style="text-align: center; border-right: 1px solid #cccccc;"',
	span: 'style="display: inline; width: 10px; height: 10px; padding: 1px; border: 1px solid black; background-color: white;"',
};

const moonPhases = [
	'Full Moon',
	'Waning Gibbous',
	'Last Quarter',
	'Waning Crescent',
	'New Moon',
	'Waxing Crescent',
	'First Quarter',
	'Waxing Gibbous',
];

const moonImgPhases = [
	`https://files.d20.io/images/389893889/Bcl_WPuUqOJIP8OO4ooDXQ/max.png?1713793621`,
	`https://files.d20.io/images/389893905/FyjiQSaw0WPAZHbkhicnrw/max.png?1713793633`,
	`https://files.d20.io/images/389893892/CkHmX-tKm5KAn21IkyEoLA/max.png?1713793625`,
	`https://files.d20.io/images/389893902/UnAA93UJ5HhW85kyVCVGxw/max.png?1713793631`,
	`https://files.d20.io/images/389893898/CpkJzbZmiYEiZV0Cxxaajg/max.png?1713793629`,
	`https://files.d20.io/images/389893910/Z7F8tRA-naEmJ4o5DkBrog/max.png?1713793638`,
	`https://files.d20.io/images/389893879/l2ujYbgq36yrmGrKmKgrUQ/max.png?1713793617`,
	`https://files.d20.io/images/389893914/S0Wy_rP0FiHMKQCRTTAMlQ/max.png?1713793640`
];

// const moonImgPhases = [
//	 `https://drive.google.com/uc?export=download&id=1ploTATS_8PDVsnBnJJqa7kaXaQgrgCGF`,
//	 `https://drive.google.com/uc?export=download&id=1zphqzvtN_nW0V_3PfXqlrvsWvIQpTF2S`,
//	 `https://drive.google.com/uc?export=download&id=1-AH7nAWzkp8PYtpzJN0eaEuP5O_v8oap`,
//	 `https://drive.google.com/uc?export=download&id=158QGi478mYm49--8d-LbU9AiLRX3Ok-p`,
//	 `https://drive.google.com/uc?export=download&id=1HerLO9JpgBtmZwPxPTczVgg4IGMK4xaP`,
//	 `https://drive.google.com/uc?export=download&id=1rosA7s2n5EccbaiZgSAQLpKwl8_r6KgP`,
//	 `https://drive.google.com/uc?export=download&id=1uwbz2mc-TzOIJi_0KaOe_b-P1m-OGq17`,
//	 `https://drive.google.com/uc?export=download&id=1ytJTJHtvUaOLWVmlBqa_7krKuNPTd6wO`
// ];

// const moonImgPhases = [
//	 "https://www.dropbox.com/s/yo8aqiyw8y8zbzh/full%20moon.jpg?dl=1",
//	 "https://www.dropbox.com/s/lgffcyw68w1df9l/waning%20gibbous.jpg?dl=1",
//	 "https://www.dropbox.com/s/o509ci5j2goqvqc/last%20quarter.jpg?dl=1",
//	 "https://www.dropbox.com/s/3fccjvk2v88hqqo/waning%20crescent.jpg?dl=1",
//	 "https://www.dropbox.com/s/jpq8tl2m00e8m0j/new%20moon.jpg?dl=1",
//	 "https://www.dropbox.com/s/b8p388vrvv3jw2j/waxing%20crescent.jpg?dl=1",
//	 "https://www.dropbox.com/s/glnn9q9swr5o3wk/first%20quarter.jpg?dl=1",
//	 "https://www.dropbox.com/s/b4li1bckebp4cua/waxing%20gibbous.jpg?dl=1"
// ];

// const moonImgPhases = [
//	 `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12"><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width=".6" d="M11 6A5 5 0 1 0 1 6a5 5 0 0 0 10 0zm0 0"/></svg>`,
//	 `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12"><path style="fill:none;stroke:#000;stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M11 6A5 5 0 1 0 1 6a5 5 0 0 0 10 0zm0 0" transform="matrix(-1 0 0 1 12 0)"/><path style="fill:#000;fill-opacity:1;stroke:#000;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M3.93 6c0-1.953.79-3.72 2.07-5a5 5 0 1 0 0 10 7.049 7.049 0 0 1-2.07-5Z" transform="matrix(-1 0 0 1 12 0)"/></svg>`,
//	 `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12"><path d="M11 6A5 5 0 1 0 1 6a5 5 0 0 0 10 0zm0 0" style="fill:none;stroke:#000;stroke-width:.6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"/><path d="M11 6a5 5 0 0 0-5-5v10a5 5 0 0 0 5-5Z" style="fill:#000;fill-opacity:1;stroke:none;stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"/></svg>`,
//	 `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12"><path style="fill:none;stroke:#000;stroke-width:.6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none" d="M11 6A5 5 0 1 0 1 6a5 5 0 0 0 10 0zm0 0"/><path style="fill:#000;stroke:#000;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1;fill-opacity:1" d="M11 6a5 5 0 0 0-5-5 7.049 7.049 0 0 0-2.07 5c0 1.953.79 3.72 2.07 5a5 5 0 0 0 5-5Z"/></svg>`,
//	 `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width=".6" d="M11 6A5 5 0 1 0 1 6a5 5 0 0 0 10 0zm0 0"/></svg>`,
//	 `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12"><path style="fill:none;stroke:#000;stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M11 6A5 5 0 1 0 1 6a5 5 0 0 0 10 0zm0 0" transform="matrix(-1 0 0 1 12 0)"/><path style="fill:#000;fill-opacity:1;stroke:#000;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M11 6a5 5 0 0 0-5-5 7.049 7.049 0 0 0-2.07 5c0 1.953.79 3.72 2.07 5a5 5 0 0 0 5-5Z" transform="matrix(-1 0 0 1 12 0)"/></svg>`,
//	 `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12"><path d="M11 6A5 5 0 1 0 1 6a5 5 0 0 0 10 0zm0 0" style="fill:none;stroke:#000;stroke-width:.6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"/><path d="M1 6a5 5 0 0 1 5-5v10a5 5 0 0 1-5-5Z" style="fill:#000;fill-opacity:1;stroke:none;stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"/></svg>`,
//	 `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12"><path d="M11 6A5 5 0 1 0 1 6a5 5 0 0 0 10 0zm0 0" style="fill:none;stroke:#000;stroke-width:.6;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-opacity:1;stroke-dasharray:none"/><path d="M3.93 6c0-1.953.79-3.72 2.07-5a5 5 0 1 0 0 10 7.049 7.049 0 0 1-2.07-5Z" style="fill:#000;stroke:#000;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1;fill-opacity:1"/></svg>`
// ]

// const moonImgPhases = [
//	 `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9Ii42IiBkPSJNMTEgNkE1IDUgMCAxIDAgMSA2YTUgNSAwIDAgMCAxMCAwem0wIDAiLz48L3N2Zz4K`,
//	 `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwO3N0cm9rZS13aWR0aDouNjAwMDAwMDI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiBkPSJNMTEgNkE1IDUgMCAxIDAgMSA2YTUgNSAwIDAgMCAxMCAwem0wIDAiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDEyIDApIi8+PHBhdGggc3R5bGU9ImZpbGw6IzAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIGQ9Ik0zLjkzIDZjMC0xLjk1My43OS0zLjcyIDIuMDctNWE1IDUgMCAxIDAgMCAxMCA3LjA0OSA3LjA0OSAwIDAgMS0yLjA3LTVaIiB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAxMiAwKSIvPjwvc3ZnPgo=`,
//	 `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBkPSJNMTEgNkE1IDUgMCAxIDAgMSA2YTUgNSAwIDAgMCAxMCAwem0wIDAiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDA7c3Ryb2tlLXdpZHRoOi42O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIvPjxwYXRoIGQ9Ik0xMSA2YTUgNSAwIDAgMC01LTV2MTBhNSA1IDAgMCAwIDUtNVoiIHN0eWxlPSJmaWxsOiMwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOi42MDAwMDAwMjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiLz48L3N2Zz4K`,
//	 `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9Ii42IiBkPSJNMTEgNkE1IDUgMCAxIDAgMSA2YTUgNSAwIDAgMCAxMCAwem0wIDAiLz48L3N2Zz4K`,
//	 `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwO3N0cm9rZS13aWR0aDouNjAwMDAwMDI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiBkPSJNMTEgNkE1IDUgMCAxIDAgMSA2YTUgNSAwIDAgMCAxMCAwem0wIDAiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDEyIDApIi8+PHBhdGggc3R5bGU9ImZpbGw6IzAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIGQ9Ik0xMSA2YTUgNSAwIDAgMC01LTUgNy4wNDkgNy4wNDkgMCAwIDAtMi4wNyA1YzAgMS45NTMuNzkgMy43MiAyLjA3IDVhNSA1IDAgMCAwIDUtNVoiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDEyIDApIi8+PC9zdmc+Cg==`,
//	 `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBkPSJNMTEgNkE1IDUgMCAxIDAgMSA2YTUgNSAwIDAgMCAxMCAwem0wIDAiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDA7c3Ryb2tlLXdpZHRoOi42O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIvPjxwYXRoIGQ9Ik0xIDZhNSA1IDAgMCAxIDUtNXYxMGE1IDUgMCAwIDEtNS01WiIgc3R5bGU9ImZpbGw6IzAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6LjYwMDAwMDAyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIvPjwvc3ZnPgo=`,
//	 `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBkPSJNMTEgNkE1IDUgMCAxIDAgMSA2YTUgNSAwIDAgMCAxMCAwem0wIDAiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDA7c3Ryb2tlLXdpZHRoOi42O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIvPjxwYXRoIGQ9Ik0zLjkzIDZjMC0xLjk1My43OS0zLjcyIDIuMDctNWE1IDUgMCAxIDAgMCAxMCA3LjA0OSA3LjA0OSAwIDAgMS0yLjA3LTVaIiBzdHlsZT0iZmlsbDojMDAwO3N0cm9rZTojMDAwO3N0cm9rZS13aWR0aDowO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MTtmaWxsLW9wYWNpdHk6MSIvPjwvc3ZnPgo=`
// ];

const monthNames = ['Hammer', 'Alturiak', 'Ches', 'Tarsakh', 'Mirtul', 'Kythorn', 'Flamerule', 'Eleasias', 'Eleint', 'Marpenoth', 'Uktar', 'Nightal'];

class FaerunCalendar {
	constructor() {
		this.style = styles;
		this.default = state.calendar;
		this.moons = moonPhases;
		this.months = monthNames;
		this.alarms = state.alarms;
	}

	handleInput(msg) {
		const args = msg.content.split(/\s+--/);

		if (msg.type !== 'api') return;

		if (playerIsGM(msg.playerid)) {
			switch (args[0]) {
				case '!cal':
					switch (args[1]) {
						default:
							chkAlarms();
							calendarMenu();
							break;
						case 'setday':
							const day = parseInt(args[2]);
							if (isNaN(day)) return sendChat('Faerûn Calendar', 'Please input a valid number for the day.');

							setDay(day);
							updMoon();
							chkAlarms();
							calendarMenu();
							break;
						case 'setmonth':
							const month = args[2];
							if (!monthNames.includes(month)) return sendChat('Faerûn Calendar', 'Please input a valid month.');

							setMonth(month);
							updMoon();
							chkAlarms();
							calendarMenu();
							break;
						case 'setyear':
							const year = parseInt(args[2]);
							if (isNaN(year)) return sendChat('Faerûn Calendar', 'Please input a valid number for the year.');

							setYear(year);
							updMoon();
							chkAlarms();
							calendarMenu();
							break;
						case 'settime':
							const hour = parseInt(args[3]);
							const minute = parseInt(args[5]);
							if (isNaN(hour) || isNaN(minute))
								return sendChat('Faerûn Calendar', 'Please input a valid number for the hour and minute.');

							setHour(hour);
							setMinute(minute);
							updMoon();
							chkAlarms();
							calendarMenu();
							break;
						case 'advance':
							const amount = parseInt(args[2]);
							const type = args[3];
							if (isNaN(amount)) return sendChat('Faerûn Calendar', 'Please input a valid number for the amount.');
							if (!['Short Rest', 'Long Rest', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year'].includes(type))
								return sendChat('Faerûn Calendar', 'Please input a valid type.');

							advance(amount, type);
							updMoon();
							chkAlarms();
							calendarMenu();
							break;
						case 'weather':
							if (args[2] === 'toggle') {
								toggleWeather();
								calendarMenu();
							} else {
								randomizeWeather();
								calendarMenu();
							}
							break;
						case 'moon':
							if (args[2] === 'toggle') {
								toggleMoon();
								calendarMenu();
							} else if (args[2] === 'phase') {
								const phase = args[3];
								updMoon(phase);
								calendarMenu();
							} else {
								updMoon();
								calendarMenu();
							}
							break;
						case 'show':
							showCal();
							break;
						case 'reset':
							setCalendarDefaults();
							calendarMenu();
							break;
					}
					break;
				case '!month':
					renameMonth(args[1], args[2]);
					break;
				case '!alarm':
					switch (args[1]) {
						case undefined:
							alarmMenu();
							break;
						default:
							const num = parseInt(args[1]);
							if (isNaN(num)) return sendChat('Faerûn Calendar', 'Please input a valid number for the alarm.');

							switch (args[2]) {
								case 'settitle':
									setTitle(num, args[3]);
									break;
								case 'setdate':
									setDate(num, args[3]);
									break;
								case 'settime':
									setTime(num, args[3]);
									break;
								case 'setmessage':
									setMessage(num, args[3]);
									break;
							}

							alarmMenu(num);
							break;
						case 'new':
							createAlarm(args[2], args[4], args[6], args[8]);
							alarmMenu();
							break;
						case 'delete':
							deleteAlarm(args[2]);
							alarmMenu();
							break;
						case 'reset':
							setAlarmDefaults();
							alarmMenu();
							break;
					}
					break;
			}
		} else {
			switch (args[0]) {
				case '!cal':
					showCal();
					break;
			}
		}
	}

	checkInstall() {
		if (!state.calendar) {
			setCalendarDefaults();
		}

		if (!state.alarms) {
			setAlarmDefaults();
		}
	}

	registerEventHandlers() {
		on('chat:message', this.handleInput);
		log('Faerûn Calendar - Registered Event Handlers!');
	}
}

const calendar = new FaerunCalendar();

function setCalendarDefaults() {
	state.calendar = {
		ord: 1,
		day: 1,
		month: 1,
		year: 1486,
		hour: 1,
		minute: 0,
		weather: 'It is a cool but sunny day',
		moon: 'Full Moon',
		moonImg: '',
		wtype: true,
		mtype: true,
	};
	log('Faerûn Calendar: Successfully registered Calendar defaults!');
}

function setAlarmDefaults() {
	state.alarms = [];
	log('Faerûn Calendar: Successfully registered Alarm defaults!');
}

function updOrdinal() {
	state.calendar.ord = 30 * (state.calendar.month - 1) + state.calendar.day;
}

function getSuffix() {
	const ordinal = state.calendar.ord;

	if (ordinal >= 11 && ordinal <= 13) return 'th';

	switch (ordinal % 10) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
}

function updDate() {
	updOrdinal();
	const ordinal = state.calendar.ord;

	let date, month;

	if (Math.ceil(ordinal / 30) <= 1) {
		month = calendar.months[0];
		date = ordinal;
		setMonth(month);
	} else {
		month = monthNames[Math.ceil(ordinal / 30) - 1];
		date = ordinal - 30 * (Math.ceil(ordinal / 30) - 1);
		setMonth(month);
	}

	setDay(date);
}

function setDay(day) {
	state.calendar.day = day;
}

function getMonth() {
	return monthNames[state.calendar.month - 1];
}

function setMonth(month) {
	state.calendar.month = monthNames.indexOf(month) + 1;
}

function setYear(year) {
	state.calendar.year = year;
}

function getHour() {
	if (state.calendar.hour < 10) return `0${state.calendar.hour}`;
	return `${state.calendar.hour}`;
}

function setHour(hour) {
	state.calendar.hour = hour;
}

function getMinute() {
	if (state.calendar.minute < 10) return `0${state.calendar.minute}`;
	return `${state.calendar.minute}`;
}

function setMinute(minute) {
	state.calendar.minute = minute;
}

function updMoon(phase) {
	log(`updMoon: ${phase}`);
	if (!phase) {
		const ordinal = state.calendar.ord;
		const year = state.calendar.year;
		const remainder = year / 4 - Math.floor(year / 4);
		log(`ordinal: ${ordinal}`);
		log(`year: ${year}`);
		log(`remainder: ${remainder}`);
		let moonArray = [];

		switch (remainder) {
			case 0.25:
				moonArray = getMoonArray(2);
				break;
			case 0.5:
				moonArray = getMoonArray(3);
				break;
			case 0.75:
				moonArray = getMoonArray(4);
				break;
			default:
				moonArray = getMoonArray(1);
				break;
		}

		//const moonNum = moonArray.split(',');
		log(`ordinal % 8: ${ordinal % 8}`);
		log(`moonArray: ${moonArray}`);
		log(`moonArray[ordinal % 8]: ${moonArray[ordinal % 8]}`);
		log(`state.calendar.moon: ${state.calendar.moon}`);
		//getMoon(moonArray[ordinal % 8]);
		getMoon(moonArray[ordinal]);
	} else {
		state.calendar.moon = phase;
	}
}

function getMoonArray(num) {
	let moonArray;

	switch (num) {
		case 1:
			moonArray =
				[0,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,14,15,15,16,16,16,1,2,2,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,4,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,14,15,15,16,16,16,1,2,2,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,15,15,15,16,16,1];
			break;
		case 2:
			moonArray =
				[0,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,14,15,15,16,16,16,1,2,2,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,14,15,15,16,16,16,0,1,2,2,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,14,15,15,16,16,16,1,2,2,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,14,15,15,16,16,16,1,2,2,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,15,15,15,16,16,1];
			break;
		case 3:
			moonArray =
				[0,2,2,3,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,14,15,15,16,16,16,1,2,2,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,14,15,15,16,16,16,0,1,2,2,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,14,15,15,16,16,16,1,2,2,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,14,15,15,16,16,16,1,2,2,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1];
			break;
		case 4:
			moonArray =
				[0,2,2,3,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,14,15,15,16,16,16,1,2,2,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,3,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,14,15,15,16,16,16,1,2,2,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,16,16,1,2,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,15,16,16,0,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,15,16,16,1,2,2,3,3,4,4,5,6,6,7,7,7,8,8,9,10,10,11,11,12,12,13,14,14,14,15,15,16,16,16,1,2,2,3,3,4,4,5,6,6,7,7,8,8,9,10,10,11,11,11,12,12,13,14,14,15,15,15,16,16];
			break;
	}

	return moonArray;
}

function getMoon(num) {
	log(`getMoon: ${num}`);
	let phase;
	if (num && isNaN(num)) {
		const phase = {
			'full moon': 0,
			'waning gibbous': 1,
			'last quarter': 2,
			'waning crescent': 3,
			'new moon': 4,
			'waxing crescent': 5,
			'first quarter': 6,
			'waxing gibbous': 7
		}[num.toLowerCase()];
	} else {
		phase = [0, 0, 1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 7, 7, 7][num];
	}

	if (phase) {
		state.calendar.moon = moonPhases[phase];
		state.calendar.moonImg = moonImgPhases[phase];
	} else {
		state.calendar.moon = '';
		state.calendar.moonImg = '';
	}
}

function calendarMenu() {
	updDate();

	const suffix = getSuffix();
	const day = state.calendar.day;
	const month = getMonth();
	const year = state.calendar.year;
	const hour = getHour();
	const minute = getMinute();
	const weather = state.calendar.wtype ? state.calendar.weather : null;
	const moon = state.calendar.mtype ? state.calendar.moon : null;

	let months = monthNames.toString();

	for (let i = 0; i < monthNames.length; i++) {
		months = months.replace(',', '|');
	}

	switch (weather) {
		default:
			switch (moon) {
				default:
					sendChat(
						'Faerûn Calendar',
						`/w gm <div ${calendar.style.divMenu}>` + //--
							`<div ${calendar.style.header}>Calendar Menu</div>` + //--
							`<div ${calendar.style.arrow}></div>` + //--
							`<table>` + //--
							`<tr><td ${calendar.style.tdReg}>Day: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setday --?{Day?|${day}}">${day}${suffix}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Month: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setmonth --?{Month?|${months}}">${month}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Year: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setyear --?{Year?|${year}}">${year}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Time: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --settime --hour --?{Hour?|${hour}} --minute --?{Minute?|${minute}}">${hour}:${minute}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Moon: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --moon --phase --?{Phase?|${moon}}">${moon}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Weather: </td><td ${calendar.style.tdReg}>${weather}</td></tr>` + //--
							`</table>` + //--
							`<br><br>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --advance --?{Amount?|1} --?{Type?|Short Rest|Long Rest|Minute|Hour|Day|Week|Month|Year}">Advance Time</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --weather --toggle">Toggle Weather Display</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --moon --toggle">Toggle Moon Display</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --weather">Randomise Weather</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --moon">Reset Moon Phase</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!alarm">Open Alarm Menu</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --show">Show to Players</a></div>` + //--
							`</div>`
					);
					break;
				case null:
					sendChat(
						'Faerûn Calendar',
						`/w gm <div ${calendar.style.divMenu}>` + //--
							`<div ${calendar.style.header}>Calendar Menu</div>` + //--
							`<div ${calendar.style.arrow}></div>` + //--
							`<table>` + //--
							`<tr><td ${calendar.style.tdReg}>Day: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setday --?{Day?|${day}}">${day}${suffix}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Month: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setmonth --?{Month?|${months}}">${month}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Year: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setyear --?{Year?|${year}}">${year}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Time: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --settime --hour --?{Hour?|${hour}} --minute --?{Minute?|${minute}}">${hour}:${minute}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Weather: </td><td ${calendar.style.tdReg}>${weather}</td></tr>` + //--
							`</table>` + //--
							`<br><br>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --advance --?{Amount?|1} --?{Type?|Short Rest|Long Rest|Minute|Hour|Day|Week|Month|Year}">Advance Time</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --weather --toggle">Toggle Weather Display</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --moon --toggle">Toggle Moon Display</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --weather">Randomise Weather</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!alarm">Open Alarm Menu</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --show">Show to Players</a></div>` + //--
							`</div>`
					);
					break;
			}
			break;
		case null:
			switch (state.calendar.mytpe) {
				default:
					sendChat(
						'Faerûn Calendar',
						`/w gm <div ${calendar.style.divMenu}>` + //--
							`<div ${calendar.style.header}>Calendar Menu</div>` + //--
							`<div ${calendar.style.arrow}></div>` + //--
							`<table>` + //--
							`<tr><td ${calendar.style.tdReg}>Day: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setday --?{Day?|${day}}">${day}${suffix}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Month: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setmonth --?{Month?|${months}}">${month}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Year: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setyear --?{Year?|${year}}">${year}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Time: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --settime --hour --?{Hour?|${hour}} --minute --?{Minute?|${minute}}">${hour}:${minute}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Moon: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --moon --phase --?{Phase?|${moon}}">${moon}</a></td></tr>` + //--
							`</table>` + //--
							`<br><br>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --advance --?{Amount?|1} --?{Type?|Short Rest|Long Rest|Minute|Hour|Day|Week|Month|Year}">Advance Time</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --weather --toggle">Toggle Weather Display</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --moon --toggle">Toggle Moon Display</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --moon">Reset Moon Phase</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!alarm">Open Alarm Menu</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --show">Show to Players</a></div>` + //--
							`</div>`
					);
					break;
				case null:
					sendChat(
						'Faerûn Calendar',
						`/w gm <div ${calendar.style.divMenu}>` + //--
							`<div ${calendar.style.header}>Calendar Menu</div>` + //--
							`<div ${calendar.style.arrow}></div>` + //--
							`<table>` + //--
							`<tr><td ${calendar.style.tdReg}>Day: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setday --?{Day?|${day}}">${day}${suffix}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Month: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setmonth --?{Month?|${months}}">${month}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Year: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --setyear --?{Year?|${year}}">${year}</a></td></tr>` + //--
							`<tr><td ${calendar.style.tdReg}>Time: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!cal --settime --hour --?{Hour?|${hour}} --minute --?{Minute?|${minute}}">${hour}:${minute}</a></td></tr>` + //--
							`</table>` + //--
							`<br><br>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --advance --?{Amount?|1} --?{Type?|Short Rest|Long Rest|Minute|Hour|Day|Week|Month|Year}">Advance Time</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --weather --toggle">Toggle Weather Display</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --moon --toggle">Toggle Moon Display</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!alarm">Open Alarm Menu</a></div>` + //--
							`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal --show">Show to Players</a></div>` + //--
							`</div>`
					);
					break;
			}
			break;
	}
}

function showCal() {
	updDate();

	const suffix = getSuffix();
	const day = state.calendar.day;
	const month = getMonth();
	const year = state.calendar.year;
	const hour = getHour();
	const minute = getMinute();
	const weather = state.calendar.wtype ? state.calendar.weather : null;
	const moon = state.calendar.mtype ? state.calendar.moon : null;
	//const moonImg = (moon && state.calendar.moonImg) ? ('<img src="' + state.calendar.moonImg + '" style="width:30px; height:30px;">') : '';
	//const moonImg = (moon && state.calendar.moonImg) ? state.calendar.moonImg : '';
	const moonImg = (moon && state.calendar.moonImg) ? `<img src="${state.calendar.moonImg}" />` : '';
	log(moonImg);

	switch (weather) {
		default:
			switch (moon) {
				default:
					sendChat(
						'Faerûn Calendar',
						`<div ${calendar.style.divMenu}>` + //--
							`<div ${calendar.style.header}>Faerûn Calendar</div>` + //--
							`<div ${calendar.style.sub}>Player View</div>` + //--
							`<div ${calendar.style.arrow}></div>` + //--
							`${day} of ${month}, ${year}` + //--
							`<br>Current Time: ${hour}:${minute}<br>` + //--
							`<br>Today\'s Weather: ${weather}<br>` + //--
							`<br>Moon Phase: ${moon} ${moonImg}` + //--
							`</div>`
					);
					break;
				case null:
					sendChat(
						'Faerûn Calendar',
						`<div ${calendar.style.divMenu}>` + //--
							`<div ${calendar.style.header}>Faerûn Calendar</div>` + //--
							`<div ${calendar.style.sub}>Player View</div>` + //--
							`<div ${calendar.style.arrow}></div>` + //--
							`${day} of ${month}, ${year}` + //--
							`<br>Current Time: ${hour}:${minute}<br>` + //--
							`<br>Today\'s Weather: ${weather}<br>` + //--
							`</div>`
					);
					break;
			}
			break;
		case null:
			switch (moon) {
				default:
					sendChat(
						'Faerûn Calendar',
						`<div ${calendar.style.divMenu}>` + //--
							`<div ${calendar.style.header}>Faerûn Calendar</div>` + //--
							`<div ${calendar.style.sub}>Player View</div>` + //--
							`<div ${calendar.style.arrow}></div>` + //--
							`${day} of ${month}, ${year}` + //--
							`<br>Current Time: ${hour}:${minute}<br>` + //--
							`<br>Moon Phase: ${moon} ${moonImg}` + //--
							`</div>`
					);
					break;
				case null:
					sendChat(
						'Faerûn Calendar',
						`<div ${calendar.style.divMenu}>` + //--
							`<div ${calendar.style.header}>Faerûn Calendar</div>` + //--
							`<div ${calendar.style.sub}>Player View</div>` + //--
							`<div ${calendar.style.arrow}></div>` + //--
							`${day} of ${month}, ${year}` + //--
							`<br>Current Time: ${hour}:${minute}<br>` + //--
							`</div>`
					);
					break;
			}
			break;
	}
}

function advance(amount, type) {
	let ordinal = state.calendar.ord;
	let day = state.calendar.day;
	let month = state.calendar.month;
	let year = state.calendar.year;
	let hour = state.calendar.hour;
	let minute = state.calendar.minute;

	switch (type.toLowerCase()) {
		case 'short rest':
			hour += amount;
			break;
		case 'long rest':
			hour += amount * 8;
			break;
		case 'minute':
			minute += amount;
			break;
		case 'hour':
			hour += amount;
			break;
		case 'day':
			day += amount;
			ordinal += amount;
			break;
		case 'week':
			day += amount * 7;
			ordinal += amount * 7;
			break;
		case 'month':
			month += amount;
			break;
		case 'year':
			year += amount;
			break;
	}

	while (minute >= 60) {
		hour++;
		minute -= 60;
	}

	while (hour >= 24) {
		ordinal++;
		day++;
		hour -= 24;
	}

	while (ordinal > 360) {
		year++;
		ordinal -= 360;
	}

	while (day > 30) {
		month++;
		day -= 30;
	}

	while (month > 12) {
		year++;
		month -= 12;
	}

	setMinute(minute);
	setHour(hour);
	setYear(year);
	updDate();
}

function randomizeWeather() {
	let temp, wind, season, precip;
	const ordinal = state.calendar.ord;

	switch (ordinal) {
		case ordinal > 330 || ordinal <= 75:
			season = 'Winter';
			break;
		case ordinal <= 170:
			season = 'Spring';
			break;
		case ordinal <= 240:
			season = 'Summer';
			break;
		case ordinal <= 330:
			season = 'Fall';
			break;
	}

	let rand = randomInteger(21);

	switch (rand) {
		case rand >= 15 && rand <= 17:
			wind = 'the wind is blowing strongly ';
			switch (season) {
				case 'Winter':
					temp = 'It is a bitterly cold winter day, ';
					break;
				case 'Spring':
					temp = 'It is a cold spring day, ';
					break;
				case 'Summer':
					temp = 'It is a cool summer day, ';
					break;
				case 'Fall':
					temp = 'It is a cold fall day, ';
					break;
			}
			break;
		case rand >= 18 && rand <= 20:
			wind = 'the wind is blowing gently ';
			switch (season) {
				case 'Winter':
					temp = 'It is a mild winter day, ';
					break;
				case 'Spring':
					temp = 'It is a hot spring day, ';
					break;
				case 'Summer':
					temp = 'It is a blisteringly hot summer day, ';
					break;
				case 'Fall':
					temp = 'It is a hot fall day, ';
					break;
			}
			break;
		default:
			wind = 'the wind is calm ';
			switch (season) {
				case 'Winter':
					temp = 'It is a cold winter day, ';
					break;
				case 'Spring':
					temp = 'It is a warm spring day, ';
					break;
				case 'Summer':
					temp = 'It is a hot summer day, ';
					break;
				case 'Fall':
					temp = 'It is a cool fall day, ';
					break;
			}
			break;
	}

	rand = randomInteger(21);

	switch (rand) {
		case rand >= 15 && rand <= 17:
			switch (season) {
				case 'Winter':
					precip = 'and snow falls softly from the sky.';
					break;
				default:
					precip = 'and it is raining lightly.';
					break;
			}
			break;
		case rand >= 18 && rand <= 20:
			switch (season) {
				case 'Winter':
					precip = 'and snow falls heavily from the sky.';
					break;
				default:
					precip = 'and it is raining heavily.';
					break;
			}
			break;
		default:
			switch (randomInteger(2)) {
				case 1:
					precip = 'and the sky is clear.';
					break;
				case 2:
					precip = 'and the sky is overcast.';
					break;
			}
			break;
	}

	state.calendar.weather = temp + wind + precip;
}

function toggleWeather() {
	state.calendar.wtype = !state.calendar.wtype;
}

function toggleMoon() {
	state.calendar.mtype = !state.calendar.mtype;
}

function alarmMenu(num) {
	const alarm = state.alarms[num];
	const list = [];
	const len = state.alarms.length;

	if (!num || !alarm) {
		if (!len || len === 0) {
			sendChat(
				'Faerûn Calendar',
				`/w gm <div ${calendar.style.divMenu}>` + //--
					`<div ${calendar.style.header}>Alarm Menu</div>` + //--
					`<div ${calendar.style.arrow}></div>` + //--
					`<div ${calendar.style.divButton}>No Alarms set</div>` + //--
					`<br><br>` + //--
					`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!alarm --new --title --?{Title?|Insert Title} --date --?{Date?|DD.MM.YYYY} --time --?{Time?|HH:MM} --message --?{Message?|Insert Message}">Create Alarm</a></div>` + //--
					`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal">Open Calendar</a></div>` + //--
					`</div>`
			);
		} else {
			for (let i = 0; i < len; i++) {
				list.push(i);
			}

			let alarmList = list.toString();

			for (let i = 0; i < len; i++) {
				alarmList = alarmList.replace(',', '|');
			}

			sendChat(
				'Faerûn Calendar',
				`/w gm <div ${calendar.style.divMenu}>` + //--
					`<div ${calendar.style.header}>Alarm Menu</div>` + //--
					`<div ${calendar.style.arrow}></div>` + //--
					`<table>` + //--
					`<tr><td>Alarm: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!alarm --?{Alarm?|${alarmList}}>Not selected</a></td></tr>` + //--
					`</table>` + //--
					`<br><br>` + //--
					`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!alarm --new --title --?{Title?|Insert Title} --date --?{Date?|DD.MM.YYYY} --time --?{Time?|HH:MM} --message --?{Message?|Insert Message}">Create Alarm</a></div>` + //--
					`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal">Open Calendar</a></div>` + //--
					`</div>`
			);
		}
	} else {
		for (let i = 0; i < len; i++) {
			list.push(i);
		}

		let alarmList = list.toString();

		for (let i = 0; i < len; i++) {
			alarmList = alarmList.replace(',', '|');
		}

		const title = alarm.title;
		const date = `${alarm.day}.${alarm.month}.${alarm.year}`;
		const time = `${alarm.hour}:${alarm.minute}`;
		const splitDate = date.split('.');
		const splitTime = time.split(':');

		sendChat(
			'Faerûn Calendar',
			`/w gm <div ${calendar.style.divMenu}>` + //--
				`<div ${calendar.style.header}>Alarm Menu</div>` + //--
				`<div ${calendar.style.arrow}></div>` + //--
				`<table>` + //--
				`<tr><td ${calendar.style.tdReg}>Alarm: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!alarm --?{Alarm?|${alarmList}}">${num}</a></td></tr>` + //--
				`<tr><td ${calendar.style.tdReg}>Title: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!alarm --${num} --settitle --?{Title?|${title}}">${title}</a></td></tr>` + //--
				`<tr><td ${calendar.style.tdReg}>Date: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!alarm --${num} --setdate --?{Day?|${splitDate[0]}}.?{Month?|${splitDate[1]}}.?{Year?|${splitDate[2]}}">${date}</a></td></tr>` + //--
				`<tr><td ${calendar.style.tdReg}>Time: </td><td ${calendar.style.tdReg}><a ${calendar.style.buttonMedium}" href="!alarm --${num} --settime --?{Hour?|${splitTime[0]}}:?{Minute?|${splitTime[1]}}">${time}</a></td></tr>` + //--
				`<tr><td ${calendar.style.tdReg}>Message: </td><td ${calendar.style.tdReg}>${alarm.message}</td></tr>` + //--
				`</table>` + //--
				`<br><br>` + //--
				`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!alarm --${num} --setmessage --?{Message?|${alarm.message}}">Set Message</a></div>` + //--
				`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!alarm --new --title --?{Title?|Insert Title} --date --?{Date?|DD.MM.YYYY} --time --?{Time?|HH:MM} --message --?{Message?|Insert Message}">Create Alarm</a></div>` + //--
				`<div ${calendar.style.divButton}><a ${calendar.style.buttonLarge}" href="!cal">Open Calendar</a></div>` + //--
				`</div>`
		);
	}
}

function createAlarm(title, date, time, message) {
	const splitDate = date.split('.');
	const splitTime = time.split(':');

	state.alarms.push({
		title: title,
		day: splitDate[0],
		month: splitDate[1],
		year: splitDate[2],
		hour: splitTime[0],
		minute: splitTime[1],
		message: message,
	});

	sendChat(
		'Faerûn Calendar',
		`/w gm Alarm #${state.alarms.length - 1} created!\n` + //--
			`Title: ${title}\n` + //--
			`Date: ${date}\n` + //--
			`Time: ${time}\n` + //--
			`Message: ${message}`
	);

	alarmMenu(state.alarms.length - 1);
}

function setTitle(num, title) {
	state.alarms[num].title = title;

	sendChat('Faerûn Calendar', `/w gm Alarm #${num} title set to \"${title}\"`);
	alarmMenu(num);
}

function setDate(num, date) {
	const splitDate = date.split('.');

	state.alarms[num].day = splitDate[0];
	state.alarms[num].month = splitDate[1];
	state.alarms[num].year = splitDate[2];

	sendChat('Faerûn Calendar', `/w gm Alarm #${num} date set to ${date}`);
	alarmMenu(num);
}

function setTime(num, time) {
	const splitTime = time.split(':');

	state.alarms[num].hour = splitTime[0];
	state.alarms[num].minute = splitTime[1];

	sendChat('Faerûn Calendar', `/w gm Alarm #${num} time set to ${time}`);
	alarmMenu(num);
}

function setMessage(num, message) {
	state.alarms[num].message = message;

	sendChat('Faerûn Calendar', `/w gm Alarm #${num} message set to \"${message}\"`);
	alarmMenu(num);
}

function deleteAlarm(num) {
	state.alarms.splice(num, 1);

	sendChat('Faerûn Calendar', `/w gm Alarm #${num} deleted`);
	alarmMenu();
}

function updateAlarm(num) {
	const alarm = state.alarms[num];

	if (!alarm) sendChat('Faerûn Calendar', `/w gm This Alarm does not exist!`);
	else {
		const title = alarm.title;
		const date = `${alarm.day}.${alarm.month}.${alarm.year}`;
		const time = `${alarm.hour}:${alarm.minute}`;
		const message = alarm.message;

		let hand = findObjs({ _type: 'handout', name: 'Alarms' }, { caseInsensitive: true })[0];

		if (!hand) {
			hand = createObj('handout', {
				name: `Alarm #${num}`,
			});
		}

		hand.set(
			'notes',
			`Title: ${title}\n` + //--
				`Date: ${date}\n` + //--
				`Time: ${time}\n` + //--
				`Message: ${message}`
		);
	}
}

function chkAlarms() {
	for (let i = 0; i < state.alarms.length; i++) {
		const alarm = state.alarms[i];

		if (alarm.hour) {
			if (
				alarm.year === state.calendar.year &&
				alarm.month === state.calendar.month &&
				alarm.day >= state.calendar.day &&
				!(alarm.day >= state.calendar.day + 7) &&
				alarm.hour >= state.calendar.hour &&
				!(alarm.hour >= state.calendar.hour + 12) &&
				alarm.minute >= state.calendar.minute &&
				!(alarm.minute >= state.calendar.minute + 30)
			) {
				sendChat(
					'Faerûn Calendar',
					`/w gm Alarm #${i} triggered!\n` + //--
						`Title: ${alarm.title}\n` + //--
						`Date: ${alarm.day}.${alarm.month}.${alarm.year}\n` + //--
						`Time: ${alarm.hour}:${alarm.minute}\n` + //--
						`Message: ${alarm.message}`
				);

				deleteAlarm(i);
			}
		} else {
			if (
				alarm.year === state.calendar.year &&
				alarm.month === state.calendar.month &&
				alarm.day >= state.calendar.day &&
				!(alarm.day >= state.calendar.day + 7)
			) {
				sendChat(
					'Faerûn Calendar',
					`/w gm Alarm #${i} triggered!\n` + //--
						`Title: ${alarm.title}\n` + //--
						`Date: ${alarm.day}.${alarm.month}.${alarm.year}\n` + //--
						`Message: ${alarm.message}`
				);

				deleteAlarm(i);
			}
		}
	}
}

on('ready', () => {
	calendar.checkInstall();
	calendar.registerEventHandlers();
});
