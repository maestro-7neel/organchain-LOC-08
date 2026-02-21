from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()
engine = create_engine('sqlite:///organchain.db')
Session = sessionmaker(bind=engine)

class Patient(Base):
    __tablename__ = 'patients'
    id           = Column(String, primary_key=True)
    blood_group  = Column(String)
    organ_needed = Column(String)
    urgency      = Column(Integer)
    wait_days    = Column(Integer)
    hospital     = Column(String)
    rank         = Column(Integer)

class Donor(Base):
    __tablename__ = 'donors'
    id         = Column(String, primary_key=True)
    blood_group= Column(String)
    organ_type = Column(String)
    hospital   = Column(String)

Base.metadata.create_all(engine)

def seed_database():
    session = Session()
    # Clear existing
    session.query(Patient).delete()
    session.query(Donor).delete()

    patients = [
        Patient(id="P-9921", blood_group="O+", organ_needed="Kidney",
                urgency=9, wait_days=340, 
                hospital="Kokilaben Hospital Mumbai", rank=1),
        Patient(id="P-4432", blood_group="O+", organ_needed="Kidney",
                urgency=7, wait_days=180,
                hospital="AIIMS Delhi", rank=2),
        Patient(id="P-7751", blood_group="O+", organ_needed="Kidney",
                urgency=6, wait_days=120,
                hospital="PGI Chandigarh", rank=3),
        Patient(id="P-0042", blood_group="B+", organ_needed="Liver",
                urgency=2, wait_days=12,
                hospital="Apollo Chennai", rank=8),
        Patient(id="P-1134", blood_group="B+", organ_needed="Liver",
                urgency=8, wait_days=290,
                hospital="Fortis Bangalore", rank=1),
        Patient(id="P-3356", blood_group="A+", organ_needed="Heart",
                urgency=10, wait_days=45,
                hospital="AIIMS Mumbai", rank=1),
    ]

    donors = [
        Donor(id="D-2847", blood_group="O+",
              organ_type="Kidney", hospital="KEM Hospital Mumbai"),
        Donor(id="D-4421", blood_group="B+",
              organ_type="Liver",  hospital="AIIMS Delhi"),
        Donor(id="D-5532", blood_group="A+",
              organ_type="Heart",  hospital="Nair Hospital Mumbai"),
    ]

    session.add_all(patients + donors)
    session.commit()
    session.close()
    print("✅ Database seeded")

if __name__ == '__main__':
    seed_database()