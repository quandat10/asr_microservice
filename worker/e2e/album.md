# Test album
_Album service zeta


> Version `1.0.0`

> [**Contact khuye**](mailto:khuyen@zeta.com.vn)


> Last updated: `Fri Jan 08 2021`

## APIs

|No.  | API Description | Actions |
|---: | ---- | ---- |
## Servers
- **https://api.production.com** - _production_
- **https://api.staging.com** - _staging_
## Details
### <a name='1'></a>[**Add a new album**](http://test.onapis.com/Test/eNq1k82O0zAQx1/F8jndOmlYldy4Iy2CckJoNXGGxDSxLXuy26rqu8A7cOK6T8KbME7b7W5Rj1zizMx/vn5OdtI0ssozaWFAWcl3TSNAWHwU0NfjIDM5IHWONfLD3acV2zVE/PzxPTs6Il/N573T0HcuUrVQSp0VUVZfdrLBqIPxZJzlFB9cM+pkiJlI+ZELgDc358CNdqntGPpjiyuSfXZZPBK0xrYXlY/eq2VfxvdfXyr+2W0+MYlcpkNoMPCGO7mZteDdLLg+8RsjBo4fncmaHQFrZwktzWjrkxC8742GNPr8e+T59ywBSqEVRnrGX7tmm9pMGj4P6SqTZGjqaNvRGSty1vpgHkCzfJFJeACCwHH2v8YEthM4iAG2okbRJZMMP2qYhvjmwsCN+G0YezIeAiWT7YDROxsxjeHWsqIwYpao08gkCqVOxgo3nCPv1q9JXRAgVh1WZ+iPWEen10islPlSnnn1aFvq2FvcFmm+hvdK1eKoNcZ4GmPgd2gnfH9+/3QHfoK6px+8mn76ZVt5zv2/ELPpK7g/3ns6ZKmWb1SZ35ZlqYrybVksUysdkG+8uQemld/mKlflUjHHgiv45lroBDxPd4Ib1GOaaWXS/7vI98/kVtc+tL87h05k)

#### `POST` 200 **/albums**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": 1,
  "content-type": "application/json"
}
```
Request body
```json
{
  "type": 0,
  "title": "nguoin 1",
  "privacy": 3,
  "avatar": "",
  "description": "anh em may be hanh tinh ban"
}
```
Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "success": true,
  "message": "Tạo album thành công",
  "data": {
    "type": 0,
    "title": "nguoin 1",
    "privacy": 3,
    "avatar": "",
    "description": "anh em may be hanh tinh ban",
    "user_id": 1,
    "id": "4085041644402494281",
    "created_at": 1610104802002,
    "updated_at": 1610104802002,
    "status": 1
  }
}
```
### <a name='2'></a>[**Get album details**](http://test.onapis.com/Test/eNp1k8GO0zAQhl8l8jndOtlQlUiIE+KChITKCaFqkgyNqWNb9nhpVfXdmWm7dLdLL0nG83tm/s/xQZlBtXWpHEyoWvUZqQDb5akYkMDYpEo1IY1+kOSnFYcdJPz+7QvHI1Fo53Pre7CjT9Q+aq2viqTaHwc1YOqjCWS84y0h+iH3EhSzQvYnLgDBPFwTD72fuEiO9tLijuRY3hZPBBvjNjeVL6t3y77MH3++VLzxNj+hSfNGL9/pplo0TaPr5n1TL6uPAvBDJfZHhAEjuz+o3WwDwc+itwI3J4ycvyxKNBP6Lltbqt47Qkcz2gfRQgjW9CDO5r8T2zuyBEhSK0yXQxLWfthLp5OmPbDql4/T+WvKlkyASBJyHDEF7xKK3m9VSzFjKdQo87S11s/BCne8R33dvnZzMyKx6jwbQ/uDXfL9FomVqlqqqyGLbkMjr9b1UlwMQCDVnt+CQP2HKJc4N+KxhNVahBUvGjrRdJvsjStEF6J5gp45PF7tsBKeuEVkKUte/yngxgKnYoJ90WExSkiGHx2ImT4ikx7WwBCqRaUr3Sw14+FrksNwL3XutqYxT530FOK4wz5Lz5WR61Utjv+4rO6d818rzCow)

#### `GET` 200 **/albums/4085041644402494281**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": null,
  "content-type": "application/json"
}
```
~~Request body~~

Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "data": {
    "id": "4085041644402494281",
    "type": 0,
    "user_id": 1,
    "title": "nguoin 1",
    "privacy": 3,
    "status": 1,
    "avatar": "",
    "description": "anh em may be hanh tinh ban",
    "created_at": 1610104802002,
    "updated_at": 1610104802002,
    "avatar_thumb": ""
  }
}
```
### <a name='3'></a>[**Remove album**](http://test.onapis.com/Test/eNp1UstOwzAQ/JXI56R5EFDJmd6QkKogISEOrrMkoYlt2Wsoqvov/AP8QX+MXVooFPXm2Z2d3ZlkLfpGVGex0HIEUYk5jOYZIjkswihiMQJ2hgjianY9q2dUWUgPt/NrKnWItkrTwSg5dMZjdZZl2YHhRXW/Fg145XqLvdE0Yp1pgmIQJRHPexKQtp8cGhNleHFww37FCcomPhb3KNtet0fK++pJ2d/9zcNvxj9v6VcqPi2z6XlW5hdlWWZFeVkW05ykO5ANOHK9FqukldYkzgwcafDgqL8vMko48zwWymgEjQm+WiZKa4deSbaTPnnytCGKRG7V4PHnoyxM88prvjjVmliPxo271xgG7K10yJCwA2+N9sB8sxQVugAxR4WBTi2y7BvUsKIZcbP8a+XoRCTW7jZK6gUW3qglIDFFPhUHQwPoFjuqnhdsopEoWcwHpcD77ytGesuWZe+273JnL8Ju+6a7SG0/dMuzsAIVOJK65x+0yDc/a+pTsX0CE+z1dg==)

#### `DELETE` 200 **/albums/4085041644402494281**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": 1,
  "content-type": "application/json"
}
```
~~Request body~~

Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "success": true,
  "message": "Xóa album thành công"
}
```
### <a name='4'></a>[**Add a new album**](http://test.onapis.com/Test/eNq1k82O0zAQx18l8jnZOmnolty4Iy2CckJoNXGGxDSxLXuy26rqu8A7cOK6T8KbME7b7W5Rj1zizMx/vn5OdkI3oipTYWBAUYl3TZNAYvAxgb4eB5GKAamzrBEf7j6t2K4h4OeP79nREblqNuutgr6zgaq5lPKsCKL6shMNBuW1I20Npzhvm1FFI8mSmB+4ADh9cw7cKBvbjr4/trgi2aeXxQNBq017UfnovVr2ZXz/9aXin91mE5PAZTqEBj1vuBObrAVnM2/7yG8M6Dl+dEYri4DzVChrCA1ltHVRCM71WkEcffY98Px7lgDF0AoDPeOvbbONbSYNn4d0mQrSNHU07Wi1SQrWOq8fQLF8ngp4AALPcfa/xgSmS3BIBtgmNSZdNEnzo4ZpiG/WD9yI34axJ+3AUzTZ9hicNQHjGHYtKvIjppE6jUyikPJkrHDDOeJu/ZrUBQFi1WF1hv6IdbBqjcRKkS/FmVePpqWOvcWiiPM1vFesFkalMITTGAO/Qzvh+/P7pz3wS6h7+sGrqadfphXn3P8LMZ2+gvvjvcdDlHL5Rpb5oizLoijm80X+Nq7okW+8uQemlS9ymctyKQt5e8sVXHMtdAKexzvBDaoxzrTS8f/N5/tncqtrH9pfUQZOfw==)

#### `POST` 200 **/albums**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": 1,
  "content-type": "application/json"
}
```
Request body
```json
{
  "type": 0,
  "title": "nguoin 2",
  "privacy": 3,
  "avatar": "",
  "description": "anh em may be hanh tinh ban"
}
```
Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "success": true,
  "message": "Tạo album thành công",
  "data": {
    "type": 0,
    "title": "nguoin 2",
    "privacy": 3,
    "avatar": "",
    "description": "anh em may be hanh tinh ban",
    "user_id": 1,
    "id": "4085041644422233619",
    "created_at": 1610104802077,
    "updated_at": 1610104802077,
    "status": 1
  }
}
```
### <a name='5'></a>[**Get album details**](http://test.onapis.com/Test/eNp1k1GP2jAMx79KlWc40tLjWKVpT9NeJk2a2NM0Ibf1aEaaRIlzAyG++2zgxh0bL21t/2P7/2t7UKZXzeNEORhRNeoTUgG2zWPRI4GxSU3UiDT4XoofVxy2kPDb188cD0Shmc2s78AOPlEz11pfFUk13w+qx9RFE8h4x0dC9H3uJCimhZxP3ACCebgWHjo/cpMc7WXEHclxcts8EWyM29x0vmTvtn1dP/54rfjH2+yEJs1qvXzUdbmo67qqqvl8Ub77IADfl2J/QOgxsvuD2k03EPw0eitwc8LI9UtSoqnQd9naieq8I3Q0pX0QLYRgTQfibPYrsb0jS4CktMJ0eUnC2vd7mXTSNAdW/fRxPD+N2ZIJEElCjiOm4F1C0futaihmnAg1yrxtpfVLsMIdn1Fftm/d3KxIrDrvxtB+Y5t8t0VipSqX6mrIotvQwNmqWoqLHgik28tdEKj/EOUW50G8lrBai7DkpKETTbfJ3riiYl2I5hk65jC/2mElPPOIyFKWvP1SwA0FjsUI+6LFYpCQDF9aEDNdRCbdr4EhlItSl7pe6ko/PfEiob9XOk9b05DHVmYKcdxhl2XmysjvVc6Pf7ms7r3nPzh+KkU=)

#### `GET` 200 **/albums/4085041644422233619**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": null,
  "content-type": "application/json"
}
```
~~Request body~~

Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "data": {
    "id": "4085041644422233619",
    "type": 0,
    "user_id": 1,
    "title": "nguoin 2",
    "privacy": 3,
    "status": 1,
    "avatar": "",
    "description": "anh em may be hanh tinh ban",
    "created_at": 1610104802077,
    "updated_at": 1610104802077,
    "avatar_thumb": ""
  }
}
```
### <a name='6'></a>[**Remove album**](http://test.onapis.com/Test/eNp1UstOwzAQ/JXI54Q8GgrkTG9ISChISIiD6yxJaGJb9hqKqv4L/wB/0B9jlxYKRb15dmdndyZZib4R1TQWWo4gKnEDo3mGSA7zMIpYjICdIYK4nF3N6hlV5tLD7c0VlTpEW6XpYJQcOuOxmmRZtmd4Ud2vRANeud5ibzSNWGeaoBhEScTzngSk7U/2jRNleHFww27FEco6PhT3KNtetwfKu+pR2d/99cNvxj9v6VcqPi2z89OszKdlWRZFMZlM8wuS7kA24Mj1SiyTVlqTODNwpMGDo/6uyCjhzPNYKKMRNCb4apkorR16JdlO+uTJ05ooErlVg8efjzI3zSuv+eJUK2I9GjduX2MYsLfSIUPCDrw12gPzzUJU6ALEHBUGOrXIsm9Qw5JmxPXir5WDE5FY29soqReYe6MWgMQU+bnYGxpAt9hR9bRgE41EyWI+KAXef18x0lu2LHu3eZdbexF2mzfdRWrzoVuehSWowJHUPf+g+dn6Z019LLZPGdj1fA==)

#### `DELETE` 200 **/albums/4085041644422233619**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": 1,
  "content-type": "application/json"
}
```
~~Request body~~

Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "success": true,
  "message": "Xóa album thành công"
}
```
### <a name='7'></a>[**Add a new album**](http://test.onapis.com/Test/eNq1k0tu2zAQhq9CcC3HlKXahnbdF0jRuquiCChqIjGWSIIcJjYM36W9Q1fd5iS9SYeyHScuvMxG1Mz88/oo7bhueLXIuJED8Ip/bBommYEnJvs6DjzjA2BnScM/335dkV3LAN++fCJHh+iq6bS3SvadDVgVQoizIvDq+443EJTXDrU1lOK8baJKBpuwlB+ogHT65hy4UTa1jb4/trgi2WeXxQPKVpv2ovLRe7Xs6/j+x2vFf7tNRyaBynQgG/C04Y5vJq10duJtn/jFAJ7iR2eyJglwnnFlDYLBCW5dEkrneq1kGn36EGj+PUkkptAKAr7gr22zTW1GDZ2HdJFx1Dh2NG202rCctM7rR6lIXmRcPkqUnuLkf4tJmo7BwAa5ZTWwLpmo6VHLcYh76wdqRG9D7FE76TGZZHsIzpoAaQy75hX6CFmijpFIzIQ4GSvYUA6/Xb8ldUEASXVYnaA/QR2sWgOSkudLfubVg2mxI+9sPkvzNbRXqhaiUhDCaYyB3mU74vv755c98GPYPf+k1dTzb9Pyc+77QszGr+DueO/p4KVYfhBlPi/LspgvikVRjit6oBtv7iTRyue5yEW5FLO8oM7RNddCJ+B5uhPYgIppppVO/2++3L+QW1370P4BXHpOhA==)

#### `POST` 200 **/albums**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": 1,
  "content-type": "application/json"
}
```
Request body
```json
{
  "type": 0,
  "title": "nguoin 1",
  "privacy": 3,
  "avatar": "",
  "description": "anh em may be hanh tinh ban"
}
```
Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "success": true,
  "message": "Tạo album thành công",
  "data": {
    "type": 0,
    "title": "nguoin 1",
    "privacy": 3,
    "avatar": "",
    "description": "anh em may be hanh tinh ban",
    "user_id": 1,
    "id": "4085041644436737348",
    "created_at": 1610104802133,
    "updated_at": 1610104802133,
    "status": 1
  }
}
```
### <a name='8'></a>[**Get album details**](http://test.onapis.com/Test/eNp1U8GOmzAQ/RXkc7JAoFmEVO2p6qVSpSo9VVU0wDR4Y2zLHm8TRfn3ziTZZjdtLsCbeX4z7wEHpQfVNjNlYULVqs9IGZguTdmABNpENVMT0ugGaX5aMewg4vdvXxiPRL7Nc+N6MKOL1FZFUVwZUbU/DmrA2AftSTvLR3xwQ+oFZPNMzkcWAK8fro2H3k0skoK5jLhDOc5uxSPBRtvNjfKlelf2bf/48y3jH2/5KZqY10XzoajLZV3X1fKxeqzq5kkC/FiK/RFhwMDuD2o334B38+CMhJsiBu5fioLmkr5NxsxU7yyhpTntvXDBe6N7EGf5c2R7R6YASWuF8fKSJGs37GXSidMemPXLhen8NCVD2kMggYwDRu9sROG7rWopJJxJapR420VRvIIV7viM+rp97+ZmRWLWeTcO7Td20fVbJGaqslFXQwbthkauLhaNuBiAQNRe7xKB+k+iLHEexGtJVmshllzUdErTbpLTNiuZ54N+gZ5zqK52mAkvPCIwlSnvvxSwY4ZTNsE+6zAbBZLmSwdipg/ISQ9r4BDKZVmURd0Ui7Ji9eSHe63ztDWNaepkpiSOO+yTzFxp+b2Wx7+xrO695j9E2Sol)

#### `GET` 200 **/albums/4085041644436737348**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": null,
  "content-type": "application/json"
}
```
~~Request body~~

Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "data": {
    "id": "4085041644436737348",
    "type": 0,
    "user_id": 1,
    "title": "nguoin 1",
    "privacy": 3,
    "status": 1,
    "avatar": "",
    "description": "anh em may be hanh tinh ban",
    "created_at": 1610104802133,
    "updated_at": 1610104802133,
    "avatar_thumb": ""
  }
}
```
### <a name='9'></a>[**Remove album**](http://test.onapis.com/Test/eNp1UstOwzAQ/JXI56RJacojZ3pDQqqChIQ4uM6ShCa2Za+hVdV/4R/gD/pj7NIXFPXm2Z2d3ZlkJdpKFDex0LIHUYgp9OYNItnNQi9i0QM2hgjidnI3KSdUmUkPD9M7KjWItkjTzijZNcZjMcqy7MjwonhaiQq8cq3F1mgasc5UQTGIkojnPQlI2w6OjYEyvDi4brfiDGUdn4p7lHWr6xPlXfWs7O/++vk345+39CcVn+bZ9TjLh5d5no8ur0ZXo/yapBuQFThyvRKLpJbWJM50HGnw4Ki/KzJKOPNhLJTRCBoTXFomSmu7Vkm2k7568rQmikRuleDx8FFmplrymh9OsSLWi3H99tWHDlsrHTIk7MBboz0w38xFgS5AzFFhoFMvsmwPSljQjLif/7VyciISa3sbJfUOM2/UHJCYYsgZ7Nkd6Bobqo4v2EQlUbKYD0qB9/srenrLmmUfN59yay/CZvOhm0htvnTNs7AAFTiSsuUfdJitD2vKc7F9AzXN9YU=)

#### `DELETE` 200 **/albums/4085041644436737348**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": 1,
  "content-type": "application/json"
}
```
~~Request body~~

Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "success": true,
  "message": "Xóa album thành công"
}
```
### <a name='10'></a>[**Add a new album**](http://test.onapis.com/Test/eNq1k0tu2zAQhq9CcC3HlGOrhnbdF0jRuquiCEbURGItkQQ5SmwYvkt7h666zUl6kw5lO05ceFktJM3MP6+P0k6aWpa5yqSFHmUp39e1AGHxSUBXDb3MZI/UOhbJj3efV2xXEPHLpw/saIl8OZ12TkPXukjlrVLqrIiy/LqTNUYdjCfjLKf44OpBJ0NMRMqPXAC8uTkHbrRLbYfQHVtckeyzy+KRoDG2uah89F4t+zq+//Za8c9u05FJ5DItQo2BN9zJzaQB7ybBdYnfEDFw/OhM1mQknEntLKGlCW19EoL3ndGQRp9+jzz/niVAKbTCSC/4K1dvU5tRw89DOh8YGRo72mZwxooZa30wj6BZfptJeASCwHH2v8UEthXYix62okLRJpMM3yoYh3hwoedG/NYPHRkPgZLJdsDonY2YxnBrWVIYMEvUaWASM6VOxgo3nCPv1m9JXRAgVh1WZ+hPWEWn10islPlSnnl1aBtq2TsrZmm+mvdK1eKgNcZ4GqPnd2hGfH9+/3QHfoLa5x+8mn7+ZRt5zv2/ELPxK7g/nnt6yLlaLtQ8L+Z8LeZFUSyKtGJAPvH6HphWXuQqV/OlmuVFwRV8fS10Ap6nM8EN6iHNtDLp/323fwG3uvad/QXCWU6L)

#### `POST` 200 **/albums**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": 1,
  "content-type": "application/json"
}
```
Request body
```json
{
  "type": 0,
  "title": "nguoin 2",
  "privacy": 3,
  "avatar": "",
  "description": "anh em may be hanh tinh ban"
}
```
Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "success": true,
  "message": "Tạo album thành công",
  "data": {
    "type": 0,
    "title": "nguoin 2",
    "privacy": 3,
    "avatar": "",
    "description": "anh em may be hanh tinh ban",
    "user_id": 1,
    "id": "4085041644445466656",
    "created_at": 1610104802166,
    "updated_at": 1610104802166,
    "status": 1
  }
}
```
### <a name='11'></a>[**Get album details**](http://test.onapis.com/Test/eNp1k8Fu2zAMhl/F0Dlp7NQxAgPDTkMvBQYM3mkYAtpmbS2yJEhUlyDIu49M0qXNFh9sU/xF8v8sH5TuVV0UM2VhQlWrJ6QMTJumrEcCbaKaqQlpdL0kvzQcthDx+7dnjkciXy8WxnVgRhepfszz/KqIqv5xUD3GLmhP2lne4oPrUydBNs9kf+QC4PXDNfHQuYmLpGAuLe5IjrPb4pFg0Ha4qXxZvVv2ff74873iH2+LE5q4KPP1Ki+LquRrVVZVtao+C8BPhdgfEXoM7P6gdvMBvJsHZwRuihg4f1mUaC74bTJmpjpnCS3Nae9FC94b3YE4W/yKbO/IEiBJNRgvH0lYu34vnU6a+sCqFxem89uUDGkPgSTkOGD0zkYUvduqmkLCmVCjxNMu8/wtaHDHe9TX7Uc3NyMSq86zMbTf2EbXbZFYqYq1uhoyaAcaeXW5XIuLHgik2ttTEKj/EOUS50Y8lrDanI4qL2o60bRDctpmS9b5oF+hYw6PVzushFduEVjKko8nBeyY4ZRNsM9azEYJSfOtBTHTBWTS/QYYQlEVeZGX63xZVBUP4vt7qXO3DY1paqWnEMcddkl6Nlp+r+r4F0tz7zP/AeP/Kl4=)

#### `GET` 200 **/albums/4085041644445466656**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": null,
  "content-type": "application/json"
}
```
~~Request body~~

Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "data": {
    "id": "4085041644445466656",
    "type": 0,
    "user_id": 1,
    "title": "nguoin 2",
    "privacy": 3,
    "status": 1,
    "avatar": "",
    "description": "anh em may be hanh tinh ban",
    "created_at": 1610104802166,
    "updated_at": 1610104802166,
    "avatar_thumb": ""
  }
}
```
### <a name='12'></a>[**Remove album**](http://test.onapis.com/Test/eNp1UktOwzAQvUrkdULS0kYla7pDQkJBQkIsXGdIQhPbssdQVPUu3AFu0Isx0z9F9coz8+bNvGcvRVuJYjCMhZY9iEI8QG/eIZLdLPQiFj1gYwghbqd303JKmZn08PhwR6kG0RZp2hklu8Z4LK6zLDsivCiel6ICr1xrsTWaWqwzVVAcREnE/Z4IpG2vjoUrZXhwcN1uxAXIKj4n9yjrVtdnzLvsRdrT+urlFPFPW7pxxaejbDLORoN8RGc8yvN8nBN1A7ICR6qXYpHU0prEmY4tDR4c1XdJjpKN6bFQRiNoTPDTMlBa27VKspz0zZOmFUEkcqkEj4dHmZnqk8dsMMWSUK/G9dtbHzpsrXTIIcUOvDXaA+PNXBToAsRsFQZadZhl+6CEBfWI+/lfKWcrIqG2u5FTHzDzRs0BCSkGE3EU1IGusaHseMgiKomSyXxQCrzfb9HTXdZM+7T+llt5ETbrL91Eav2ja+6FBajAlpQtf9Cb1WFKecm1X8Ef9Yg=)

#### `DELETE` 200 **/albums/4085041644445466656**

Request headers
```json
{
  "x-zeta-role": "user",
  "x-zeta-user-id": 1,
  "content-type": "application/json"
}
```
~~Request body~~

Response headers
```json
{
  "content-type": "text/json"
}
```
Response data
```json
{
  "success": true,
  "message": "Xóa album thành công"
}
```