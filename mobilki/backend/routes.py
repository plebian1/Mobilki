from flask import current_app, jsonify, request, abort
from app import *
from models import *
import sqlalchemy


@name_space_users.route('')
class Api_all_users(Resource):
    def get(self):
        users = Users.query.all()
        print(users)
        results = users_schema.dump(users)

        return jsonify(results)


@name_space_users.route('/<user_id>', methods=['GET', 'DELETE'])
class Api_single_user(Resource):
    def get(self, user_id):

        userquery = Users.query.filter_by(UserId=user_id)
        for i in userquery:
            user = i

        try:
            results = user_schema.dump(user)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")


@name_space_logins.route('')
class Api_all_LoginData(Resource):
    def get(self):
        logins = LoginData.query.all()
        results = loginDatas_schema.dump(logins)

        return jsonify(results)


@name_space_logins.route('/<user_id>', methods=['GET', 'DELETE'])
class Api_single_login(Resource):
    def get(self, user_id):

        userquery = LoginData.query.filter_by(UserId=user_id)
        for i in userquery:
            user = i

        try:
            results = loginData_schema.dump(user)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")


@name_space_logins.route('/<pesel>/<password>', methods=['GET', 'DELETE'])
class Api_log_into_system(Resource):
    def get(self, pesel, password):

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
                return "incorect pesel or password"
        except UnboundLocalError:
            return "incorect pesel or password"

#Diagnostics

@name_space_diagnostics.route('')
class Api_all_DiagnosticsTypes(Resource):
    def get(self):
        types = DiagnosticsTypes.query.all()
        results = diagnosticsTypes_schema.dump(types)

        return jsonify(results)

@name_space_diagnostics.route('/<diagnostic_type>')
class Api_single_DiagnosticsType(Resource):
    def get(self,diagnostic_type):
        typesquery = DiagnosticsTypes.query.filter_by(DiagnosticsTypesId = diagnostic_type )
        for i in typesquery:
            types = i
        results = diagnosticsType_schema.dump(types)

        return jsonify(results)


# APOINTMENTS
@name_space_appointments.route('')
class Api_all_Appointments(Resource):
    def get(self):
        appointments = Appointments.query.all()
        results = appointments_schema.dump(appointments)

        return jsonify(results)

@name_space_appointments.route('/<appointment_id>')
class Api_all_Appointments(Resource):
    def get(self,appointment_id):
        appointmentsquery = Appointments.query.filter_by( AppointmentsId = appointment_id)
        for i in appointmentsquery:
            appointment =  i
        results = appointment_schema.dump(appointment)

        return jsonify(results)


@name_space_appointments.route('/<user_id>', methods=['GET', 'DELETE'])
class Api_single_user_apointments(Resource):
    def get(self, user_id):

        apointmentquery = Appointments.query.filter_by(UserId=user_id)
        apointmenttab = []
        for i in apointmentquery:
            apointmenttab.append(i)

        try:
            results = appointments_schema.dump(apointmenttab)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")


@name_space_appointments.route('/last/<user_id>', methods=['GET', 'DELETE'])
class Api_single_user_last_apointment(Resource):
    def get(self, user_id):

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
        diagnosticsResults = DiagnosticsResults.query.all()
        results = diagnosticsResults_schema.dump(diagnosticsResults)

        return jsonify(results)


@name_space_diagnostics.route('/results/<user_id>', methods=['GET', 'DELETE'])
class Api_single_user_details(Resource):
    def get(self, user_id):

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
        details = AppointmentDetails.query.all()
        results = appointmentDetails.dump(details)

        return jsonify(results)


@name_space_appointments.route('/details/<user_id>', methods=['GET', 'DELETE'])
class Api_single_user_apointments_details(Resource):
    def get(self, user_id):

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
        detailsquery = AppointmentDetails.query.filter_by(AppointmentsId=appointment_id)

        for i in detailsquery:
            details = i
        try:
            results = appointmentDetail_schema.dump(details)
            return jsonify(results)
        except UnboundLocalError:
            abort(404, description="Resource not found")


# POST REQUESTY

# REJESTRACJA UZYTKOWNIKA
@name_space_logins.route('/<pesel>/<password>/<imie>/<nazwisko>', methods=['POST', 'DELETE'])
class Api_register_into_system(Resource):
    def post(self, pesel, password, imie, nazwisko):
        name = imie + " " + nazwisko

        # utworzenie uzytkownika w Users
        user = Users(Name=name)
        try:
            db.session.add(user)
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            db.session.close()
            print("this user is already in DB")
            return "this user is already in DB"
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
            return "this user is already in DB"


# NOWY APPOINTMENT

@name_space_appointments.route('/<user_id>/<data>', methods=['POST', 'DELETE'])
class Api_make_new_appointment(Resource):
    def post(self, user_id, data):
        appointment = Appointments(UserId=user_id, Date=data)
        try:
            db.session.add(appointment)
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            db.session.close()
            print("Sth went wrong with adding apointment, propably it is already added")
            return "Sth went wrong with adding apointment, propably it is already added"

# szczegoly badania
@name_space_appointments.route('/details/<apointment_id>/<diag_id>', methods=['POST', 'DELETE'])
class Api_add_details_to_apointment(Resource):
    def post(self, apointment_id, diag_id):
        appointment_details = AppointmentDetails(AppointmentsId=apointment_id, DiagnosticsTypesId=diag_id)
        try:
            db.session.add(appointment_details)
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            db.session.close()
            print("Sth went wrong with adding details to apointment, propably it is already added")
            return "Sth went wrong with adding details to apointment, propably it is already added"

# dodawanie wynikow do badania
@name_space_diagnostics.route('/results/<apointment_id>/<diag_id>/<result>', methods=['POST', 'DELETE'])
class Api_add_results_to_apointment(Resource):
    def post(self, apointment_id, diag_id, result):
        diagnostic_results = DiagnosticsResults(AppointmentsId=apointment_id, DiagnosticsTypesId=diag_id, Result=result)
        try:
            db.session.add(diagnostic_results)
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            db.session.close()
            print("Sth went wrong with adding results, propably it is already added")
            return "Sth went wrong with adding results, propably it is already added"

# dodawanie rodzajow badan


@name_space_diagnostics.route('/<name>/<price>', methods=['POST', 'DELETE'])
class Api_add_diagniostic_type(Resource):
    def post(self, name, price, ):
        diagnostic_type = DiagnosticsTypes(Name=name, Price=price)
        try:
            db.session.add(diagnostic_type)
            db.session.commit()
        except sqlalchemy.exc.IntegrityError:
            db.session.close()
            print("Sth went wrong with adding results, propably it is already added")
            return "Sth went wrong with adding results, propably it is already added"



if __name__ == "__main__":
    app.run(debug=True)
