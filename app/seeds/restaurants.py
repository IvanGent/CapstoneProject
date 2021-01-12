from app.models import db, Restaurant

def seed_restaurants():

    res = [
        Restaurant(name='Dunkin', logo='//logo.clearbit.com/dunkindonuts.com'),
        Restaurant(name='Southern Catch Seafood Restaruant', logo='')
    ]

    db.session.add_all(res)
    db.session.commit()


def undo_restaurants():
    db.session.excute('TRUNCATE restaurants;')
    db.session.commit()