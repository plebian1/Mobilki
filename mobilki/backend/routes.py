from flask import current_app, jsonify, request, abort
from app import *
from models import *
import sqlalchemy


@name_space_users.route('')
class Api_all_users(Resource):
    def get(self):
        "wszyscy użytkownicy"
        users = Users.query.all()
        results = users_schema.dump(users)

        return jsonify(results)


@name_space_users.route('', methods=['GET', 'DELETE'])
class Api_single_user(Resource):
    def get(self):
        """pojedynczy użytkownik"""
        user_id = httprequest.headers["Userid"]

        userquery = Users.query.filter_by(UserId=user_id)
        for i in userquery:
            user = i

        try:
            results = user_schema.dump(user)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")


"""@name_space_logins.route('')
class Api_all_LoginData(Resource):
    def get(self):

        logins = LoginData.query.all()
        results = loginDatas_schema.dump(logins)

        return jsonify(results)


@name_space_logins.route('/user', methods=['GET', 'DELETE'])
class Api_single_login(Resource):
    def get(self):

        user_id = httprequest.headers["Userid"]

        userquery = LoginData.query.filter_by(UserId=user_id)
        for i in userquery:
            user = i

        try:
            results = loginData_schema.dump(user)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")

"""
#Diagnostics

@name_space_diagnostics.route('')
class Api_all_DiagnosticsTypes(Resource):
    def get(self):
        """Wszystkie dostępne badania"""
        types = DiagnosticsTypes.query.all()
        results = diagnosticsTypes_schema.dump(types)

        return jsonify(results)

@name_space_diagnostics.route('/<diagnostic_id>')
class Api_single_DiagnosticsType(Resource):
    def get(self,diagnostic_id):
        """Nazwa pojedynczego badania"""
        typesquery = DiagnosticsTypes.query.filter_by(DiagnosticsTypesId = diagnostic_id )
        for i in typesquery:
            types = i
        results = diagnosticsType_schema.dump(types)

        return jsonify(results)


# APOINTMENTS
@name_space_appointments.route('')
class Api_all_Appointments(Resource):
    def get(self):
        """Wszystkie wizyty w systemie"""
        appointments = Appointments.query.all()
        results = appointments_schema.dump(appointments)

        return jsonify(results)

@name_space_appointments.route('/<appointment_id>')
class Api_single_Appointment(Resource):
    def get(self,appointment_id):
        """Pojedyncza wizyty w systemie"""
        appointmentsquery = Appointments.query.filter_by( AppointmentsId = appointment_id)
        for i in appointmentsquery:
            appointment =  i
        results = appointment_schema.dump(appointment)

        return jsonify(results)


@name_space_appointments.route('/user', methods=['GET', 'DELETE'])
class Api_single_user_apointments(Resource):
    def get(self):
        """Wszystkie wizyty danego użytkownika"""

        user_id = httprequest.headers["Userid"]

        apointmentquery = Appointments.query.filter_by(UserId=user_id)
        apointmenttab = []
        for i in apointmentquery:
            apointmenttab.append(i)

        try:
            results = appointments_schema.dump(apointmenttab)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")


@name_space_appointments.route('/<date>', methods=['GET', 'DELETE'])
class Api_single_user_apointments(Resource):
    def get(self,date):
        "Wszystkie wizyty danego dnia"
        apointmentquery = Appointments.query.filter_by(Date=date)
        apointmenttab = []
        for i in apointmentquery:
            apointmenttab.append(i)

        try:
            results = appointments_schema.dump(apointmenttab)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")




@name_space_appointments.route('/last', methods=['GET', 'DELETE'])
class Api_single_user_last_apointment(Resource):
    def get(self):
        """ Ostatnia umówiona wizyta klienta """
        user_id = httprequest.headers["Userid"]

        apointmentquery = Appointments.query.filter_by(UserId=user_id)
        for i in apointmentquery:
            apointment = i

        try:
            results = appointment_schema.dump(apointment)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")


# DIAGNOSTIC RESULTS
@name_space_diagnostics.route('/results')
class Api_all_DiagnosticsResults(Resource):
    def get(self):
        """ Wszystkie wyniki w bazie"""
        diagnosticsResults = DiagnosticsResults.query.all()
        results = diagnosticsResults_schema.dump(diagnosticsResults)

        return jsonify(results)


@name_space_diagnostics.route('/results/user', methods=['GET', 'DELETE'])
class Api_single_user_details(Resource):
    def get(self):
        """ Wyniki wszystkich badań użytkownika """
        user_id = httprequest.headers["Userid"]

        apointmentquery = Appointments.query.filter_by(UserId=user_id)
        for i in apointmentquery:
            apointment = i

        diagnosticsquery = DiagnosticsResults.query.filter_by(AppointmentsId=apointment.AppointmentsId)

        for i in diagnosticsquery:
            details = i
        try:
            results = diagnosticsResults_schema.dump(details)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")


@name_space_diagnostics.route('/results/<appointment_id>', methods=['GET', 'DELETE'])
class Api_single_appointment_results(Resource):
    def get(self, appointment_id):
        """ Wynik badań w danej wizycie """

        diagnosticsquery = DiagnosticsResults.query.filter_by(AppointmentsId=appointment_id)

        for i in diagnosticsquery:
            details = i
        try:
            results = diagnosticsResults_schema.dump(details)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")


# APOINTMENT DETAILS
@name_space_appointments.route('/details')
class Api_all_AppointmentDetails(Resource):
    def get(self):
        """ Szczegóły wszystkich wizyt w bazie """
        details = AppointmentDetails.query.all()
        results = diagnosticsResults_schema.dump(details)

        return jsonify(results)


@name_space_appointments.route('/details/user', methods=['GET', 'DELETE'])
class Api_single_user_apointments_details(Resource):
    def get(self):
        """ Szczegóły wszystkich wizyt użytkownika """
        user_id = httprequest.headers["Userid"]


        apointmentquery = Appointments.query.filter_by(UserId=user_id)
        for i in apointmentquery:
            apointment = i

        detailsquery = AppointmentDetails.query.filter_by(AppointmentsId=apointment.AppointmentsId)

        for i in detailsquery:
            details = i
        try:
            results = appointmentDetails_schema.dump(details)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")


@name_space_appointments.route('/details/<appointment_id>', methods=['GET', 'DELETE'])
class Api_single_apointment_details(Resource):
    def get(self, appointment_id):
        """ Szczegóły wizyty """
        detailsquery = AppointmentDetails.query.filter_by(AppointmentsId=appointment_id)

        for i in detailsquery:
            details = i
        try:
            results = appointmentDetail_schema.dump(details)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")


# POST REQUESTY




insert_person_data = name_space_logins.model(
    "insert_person_data",
    {
        "name": fields.String(description="ergas", required=True),
        "password": fields.String(description="aergahaess", required=True),
        "pesel": fields.String(description="haerdress", required=True),
    },
)



# REJESTRACJA UZYTKOWNIKA
@name_space_logins.route('/register', methods=['POST', 'DELETE'])
class Api_register_into_system(Resource):
    @name_space_logins.expect(insert_person_data)
    def post(self):
        """ Rejestracja użytkownika"""

        json_data = httprequest.json
        name = json_data["name"]
        pesel = json_data["pesel"]
        password = json_data["password"]


        # utworzenie uzytkownika w Users
        user = Users(Name=name)
        try:
            db.session.add(user)
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            db.session.close()
            print("this user is already in DB")
            return "this user is already in DB", 400
        # wyciagnij ostatniego dodanego uzytkownika o danej nazwie
        userquery = Users.query.filter_by(Name=name)
        for i in userquery:
            final_user = i

        login_credentials = LoginData(PESEL=pesel, Password=password, UserId=final_user.UserId)

        try:
            db.session.add(login_credentials)
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            db.session.close()
            print("this user is already in DB")
            return "this user is already in DB", 400
        return user



# logowanie


insert_person_login_data = name_space_logins.model(
    "insert_person_login_data",
    {
        "password": fields.String(description="aergahaess", required=True),
        "pesel": fields.String(description="haerdress", required=True),
    },
)

@name_space_logins.route('/login', methods=['POST', 'DELETE'])
class Api_log_into_system2(Resource):
    @name_space_logins.expect(insert_person_login_data)
    def post(self):
        """ Logowanie użytkownika"""

        json_data = httprequest.json
        pesel = json_data["pesel"]
        password = json_data["password"]

        userquery1 = LoginData.query.filter_by(PESEL=pesel)
        for i in userquery1:
            user1 = i

        userquery2 = LoginData.query.filter_by(Password=password)

        for i in userquery2:
            user2 = i
        try:
            if user1 == user2:

                userquery = Users.query.filter_by(UserId=user1.UserId)
                for i in userquery:
                    user = i
                results = user_schema.dump(user)
                return jsonify(results)
            else:
                return "incorect pesel or password", 400
        except UnboundLocalError:
            return "incorect pesel or password", 400

        return user1





insert_apointment_data = name_space_appointments.model(
    "insert_apointment_data",
    {

        "date": fields.String(description="aergahaess", required=True),
        "time": fields.String(description="haerdress", required=True),
    },
)



# NOWY APPOINTMENT

@name_space_appointments.route('/new_appointment', methods=['POST', 'DELETE'])
class Api_make_new_appointment(Resource):
    @name_space_appointments.expect(insert_apointment_data)
    def post(self):
        """Dodanie nowej wizyty dla zalogowanego użytkownika"""

        json_data = httprequest.json
        user_id = httprequest.headers["Userid"]
        date = json_data["date"]
        time = json_data["time"]

        appointment = Appointments(UserId=user_id, Date=date, Time = time)
        try:
            db.session.add(appointment)
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            db.session.close()
           # print("Sth went wrong with adding apointment, propably it is already added")
            return "Sth went wrong with adding apointment, propably it is already added",400

        return appointment.AppointmentsId



insert_appointment_details= name_space_appointments.model(
    "insert_person_login_data",
    {
        "appointmentId": fields.String(description="appointment id", required=True),
        "examId": fields.String(description="diagnostics id", required=True),
    },
)



# szczegoly badania
@name_space_appointments.route('/details', methods=['POST', 'DELETE'])
class Api_add_details_to_apointment(Resource):
    @name_space_appointments.expect(insert_appointment_details)
    def post(self):
        """ Dodawanie szczegołów do badania"""

        json_data = httprequest.json
        user_id = httprequest.headers["Userid"]
        appointmentId = json_data["appointmentId"]
        examId = json_data["examId"]


        appointment_details = AppointmentDetails(AppointmentsId=appointmentId, DiagnosticsTypesId=examId)
        try:
            db.session.add(appointment_details)
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            db.session.close()
            #print("Sth went wrong with adding details to apointment, propably it is already added")
            #return "Sth went wrong with adding details to apointment, propably it is already added"
            return 400

        return 200

# dodawanie szczegółów do badania
@name_space_diagnostics.route('/results/<apointment_id>/<diag_id>/<result>', methods=['POST', 'DELETE'])
class Api_add_results_to_apointment(Resource):
    def post(self, apointment_id, diag_id, result):
        """ Dodawanie wynikow do badania"""
        diagnostic_results = DiagnosticsResults(AppointmentsId=apointment_id, DiagnosticsTypesId=diag_id, Result=result)
        try:
            db.session.add(diagnostic_results)
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            db.session.close()
            #print("Sth went wrong with adding results, propably it is already added")
            return "Sth went wrong with adding results, propably it is already added", 400

# dodawanie rodzajow badan


@name_space_diagnostics.route('/<name>', methods=['POST', 'DELETE'])
class Api_add_diagniostic_type(Resource):
    def post(self, name ):
        """ Dodawanie rodzajów badań"""
        diagnostic_type = DiagnosticsTypes(Name=name)
        try:
            db.session.add(diagnostic_type)
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            db.session.close()
            #print("Sth went wrong with adding results, propably it is already added")
            return "Sth went wrong with adding results, propably it is already added",400



if __name__ == "__main__":
    app.run(debug=True)
