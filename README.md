# bidding-web-app
A Simple Bidding Process Web App built using `Django REST FRAMEWORK` for its backend and `React.js` for its frontend.

# SETUP
## SETUP FOR THE FRONTEND
### PRE-REQUISITES:

- Node 14

### Installation of Packages for Frontend
Go to `frontend` directory and install the packages. to install the package type the command `yarn install`.

After the installation of packages is done. Type `yarn start` to start the project. 

## SETUP FOR THE BACKEND
### PRE-REQUISITES:

- Python 3.8.5
- Pipenv

### Installation of Packages for Backend

Go to the `backend` directory and create a .env file and put the following lines:

    SECRET_KEY='=$5!7vlybgv_um)h@g-iu&ii*@sdrm21%6wwpom&m81us%t6@d'
    DEBUG=True
    GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE_CONTENTS = {"type": "service_account","project_id": "axial-matter-293412","private_key_id": "bf16ce793f689eb66179e066b12b540b1f14b791","private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCQ11q/jRJteqtG\neTFRClto60Q3o8rJ5MSbL6y653AUzt0PfzX+sZEqf4m0cQKMDu5hB8mvDDflJJYh\nGemWqiDzBeuGM4KiA7/vC9+zyQMMJFJYlg4HJqQqxTam+M+5xfZcrdI4P8GbgTn2\nHzf8Cj33ISwq8JrpUjnaYYkgxrEbM+hJmQsc03/sgRdeFRnSe2EleynOdrocPvCi\nSGaooPhzpiE/bT0EkRbAtGW3yiVWGrfusRx5tvkm1QComDuuguEMjXPk2GGnOKN6\n8XcchyWiuthaDoAHOySN3dunH5K2i8hv+sz+wZf6UjiEewL6R0GR07dATwWhlHXA\n7iVNVEbdAgMBAAECggEAEKJS3zXN3HneirDna4WzesiuJG+wneAifioK/coPkqwx\nMhLreg0dfVJ5V5o07y3VzZnt3ScbkjrR7QpDS9TNBOv0oQxwX7frhoIIFmcq7O2M\n8XSGNucGqozMmn9vp8em4/zobCJSU1ATfoMWVGE+vY93OZU5TTtuvng+HeADvfpb\nY7HhdBjCXo9KJOFdQI6iYHlLmnRNw+J4eNTT4OSV9TY/CSct0cFeudNuQPtz+2I3\na0j9cktISFoBl3bdOOZADgrP2aAG6KsyURijTjnxHTuCE5dKixVqibjAn4P+kshD\ndBWuXedDaQpXnNtXQVLJzHP8ZAmax3coXE1aI/WulwKBgQDBa6zD21wSzX0eZ1pA\nNQH1bMl4nsDt6XHRm8XohYfUpRxOOgVXQWr0xZ05YdAz8MDdB+QXufkFH4LBehkZ\nq9277NcrwvtnkwZZRqvebOW6d0OwyJM1fUztJjemFWOFH3bVsCEBVMp3tKKW+Dex\n7sX7jvYUoRlqHzQa07dCkUyR+wKBgQC/tAbNteLkV+oDd9OXEjG9hPikFTM2tEgD\n/eCQ40puFNYs54BAekTzBN0tlI2ygtnErIW8ccJSQeqGjynbBBMYFj5wqT1edklr\nVw1GJAg6k3k4BvwLG8fCqsOrgDJhvw2GfZ9hLtD4OnhaviUTOG9Tz/SVGdO08uCF\nzTNmupuLBwKBgQCkq/tmtDdreq9vVyarS3XjcT8GBoLTCtDwV+Li1+yQyhGTOCqb\n4wIgaq400GXmEq7gf3teB+NOzUkRV9ZO2NfqyvVWOKa5w57AGz7wG15qpmdm9xz9\niTQZI1R1ffhAukz+GPnAnGPUDmHujl08i8DbLxeq8I0moHJH9MAtWG8MSQKBgQC5\nJGcFuUo9+eIaI1oIpxu+y3NPFOJ3TLnYkRKXG8zAcANBLvugSfXZNrNd2ADZjKJA\n3dXzX3Kq+tpDxnRH/7FpK+J18B1C476YmmRJf3crC06hG63EFLpieYWsVo1R9bBc\nWWrZ8tsDQYUHLmikHXb3XPn8Hgtm0MKitsGTz1l1dQKBgQCawS37FPrg+yzxbCah\no8wUq5wiiS3r0muzeXNtN8D7CgVqVVjQfDPL5CV5yh5wM+I7q497AX3jbNtxd2ef\ngbWMcPN2faQg1iiyaRpgp005QnoS7QMB36R/nCZaDAs6my2KC1S2MwkZT+IKFIBx\nkliR54sXdXAyUa6IW44XrSJGlg==\n-----END PRIVATE KEY-----\n","client_email": "bidding-sample@axial-matter-293412.iam.gserviceaccount.com","client_id": "116715058644857102256","auth_uri": "https://accounts.google.com/o/oauth2/auth","token_uri": "https://oauth2.googleapis.com/token","auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bidding-sample%40axial-matter-293412.iam.gserviceaccount.com"}

Once created, install the packages using the command `pipenv install`

Once the installation of packages is done. Type `pipenv shell` to load the virtual enviroment file, then type `python manage.py migrate` to migrate models into a local database

Finally after running `python manage.py migrat`, type `python manage.py runserver` to run the project.

# Documentation (FRONTEND)

### Libraries used:
#### For State Management:
- redux
- react-redux
- react-thunk
- redux-persists

#### For Routing:
- react-router-dom

#### For Components:
- react-icons
- react-select
- react-datetime
- react-modal

## Screen Shots of the UI

### Login Page
![Login Page](/screenshots/login-page.png)
![Signup Form](/screenshots/login-page-signup.png)

### User Info Page (Seller)
![User Info](/screenshots/seller-user-info.png)

### User Info Page (Buyer)
![User Info](/screenshots/buyer-user-info.png)

### Product Bid Page
![Product Bid](/screenshots/product-bid.png)
![Product Bid Detailed](/screenshots/product-bid-detailed.png)

### My Product Page
![My Product](/screenshots/seller-my-products.png)

### My Bid Page
![My Bid](/screenshots/buyer-my-bid.png)

# Documentation (Backend)

## Libaries Used:
 
- django
- djangorestframework
- psycopg2
- django-googledrive-storage

## Available Links
### Links for Authentication
Method allowed `POST`

- `/api/login`
- `/api/logout`
- `/api/signup`
- `/api/update`

### Links for Products 
Methods allowed are `POST`, `GET`, `PATCH`, `DELETE`

- `/api/products/`
- `/api/products/:id/`
- `/api/products/bids/?product=['product_id']&buyer_id=['buyer_id']`
- `/api/products/select/?product=['prduct_id']`

### Links for Bids
Methods allowed are `POST`, `GET`, `DELETE`

- `/api/bids/`
- `/api/bids/:id/`