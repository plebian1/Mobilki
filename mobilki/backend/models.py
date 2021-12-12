from app import *
from datetime import datetime
from sqlalchemy.types import TypeDecorator, CHAR
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Users(db.Model):
    __tablename__ = 'Users'
    UserId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    Name = db.Column(db.String(), nullable=False, unique=False)


class UsersShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("UserId", "Name")


user_schema = UsersShema()
users_schema = UsersShema(many=True)


class LoginData(db.Model):
    __tablename__ = 'LoginData'
    PESEL = db.Column(db.String(), nullable=False, unique=True)
    Password = db.Column(db.String())
    UserId = db.Column(UUID(as_uuid=True), db.ForeignKey('Users.UserId'),
                       primary_key=True)  # !!!!!!! POTENCJALNE NIE WIADOMO CO


class LoginDataShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("UserId", "Password", "PESEL")


loginData_schema = LoginDataShema()
loginDatas_schema = LoginDataShema(many=True)


class DiagnosticsTypes(db.Model):
    __tablename__ = 'DiagnosticsTypes'
    DiagnosticsTypesId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    Name = db.Column(db.String(), nullable=False, unique=True)



class DiagnosticsTypesShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("DiagnosticsTypesId", "Name")


diagnosticsType_schema = DiagnosticsTypesShema()
diagnosticsTypes_schema = DiagnosticsTypesShema(many=True)


class Appointments(db.Model):
    __tablename__ = 'Appointments'
    AppointmentsId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    Date = db.Column(db.String(), nullable=False, unique=False)
    Time = db.Column(db.String(), nullable=False, unique=False)
    UserId = db.Column(UUID(as_uuid=True), db.ForeignKey('Users.UserId'))


class AppointmentsSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("AppointmentsId", "Date", "Time" ,"UserId")


appointment_schema = AppointmentsSchema()
appointments_schema = AppointmentsSchema(many=True)


class DiagnosticsResults(db.Model):
    __tablename__ = 'DiagnosticsResults'
    DiagnosticsResultsId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    Result = db.Column(db.String(), nullable=False, unique=True)
    AppointmentsId = db.Column(UUID(as_uuid=True), db.ForeignKey('Appointments.AppointmentsId'))
    DiagnosticsTypesId = db.Column(UUID(as_uuid=True), db.ForeignKey('DiagnosticsTypes.DiagnosticsTypesId'))


class DiagnosticsResultsSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("DiagnosticsResultsId", "Result", "AppointmentsId", "DiagnosticsTypesId")


diagnosticsResult_schema = DiagnosticsResultsSchema()
diagnosticsResults_schema = DiagnosticsResultsSchema(many=True)



class DiagnosticsResultsNameSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("Name", "Result")


diagnosticsResultName_schema = DiagnosticsResultsNameSchema()
diagnosticsResultsName_schema = DiagnosticsResultsNameSchema(many=True)






class AppointmentDetails(db.Model):
    __tablename__ = 'AppointmentDetails'
    AppointmentDetailsId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    AppointmentsId = db.Column(UUID(as_uuid=True), db.ForeignKey('Appointments.AppointmentsId'))
    DiagnosticsTypesId = db.Column(UUID(as_uuid=True), db.ForeignKey('DiagnosticsTypes.DiagnosticsTypesId'))


class AppointmentDetailsSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("AppointmentDetailsId", "AppointmentsId", "DiagnosticsTypesId")


appointmentDetail_schema = AppointmentDetailsSchema()
appointmentDetails_schema = AppointmentDetailsSchema(many=True)
