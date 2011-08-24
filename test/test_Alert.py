import sys, os
import unittest
import urllib2,json
sPath = os.getcwd()       
sys.path.append(sPath) 
from alert import AlertBanner

class TestAlertBanner1(unittest.TestCase):

    def setUp(self):
        self.banner = AlertBanner()
        self.banner.url = 'http://emergency.washington.edu/alert.json'

    def testload(self):
        self.banner.load()
        ## For consistent tests, we have red alert
        oFile = open('test/alert.json', 'r')
        strData = json.loads(oFile.read())
        oFile.close()

        self.assertEqual(self.banner.status, 'ok')
        self.assertEqual(self.banner.color, 'red')
        self.assertEqual(self.banner._alertdata, strData)
        self.assertEqual(self.banner.excerpt, 'DESC: Astroid Fatal')

    def testdisplay(self):
        self.assertEqual(self.banner.display('plain'),"Incoming Asteroid.\n<break />\nDESC: Astroid Fatal.")
        ### Prod Banner
        oFile = open('test/alert.js', 'r')
        strData = oFile.read()
        oFile.close()
        self.assertEqual(self.banner.display(),strData)

    def tearDown(self):
       for root, dirs, files in os.walk('storage/'):
           for f in files:
               os.unlink(os.path.join(root, f))

class TestAlertBanner2(unittest.TestCase):

    def setUp(self):
        self.banner = AlertBanner()
        self.banner.url = 'http://emergency.washington.edu/noalert.json'

    def testload(self):
        self.banner.load()
        ## For consistent tests, we have no alert
        oFile = open('test/noalert.json', 'r')
        strData = json.loads(oFile.read())
        oFile.close()

        self.assertEqual(self.banner.status, 'ok')
        self.assertEqual(self.banner.color, '')
        self.assertEqual(self.banner._alertdata, strData)
        self.assertEqual(self.banner.excerpt, 'DESC: Astroid Fatal')

    def testdisplay(self):
        self.assertEqual(self.banner.display('plain'),'')
        ### Prod Banner
        oFile = open('test/noalert.js', 'r')
        strData = oFile.read()
        oFile.close()
        self.assertEqual(self.banner.display(),strData)

    def tearDown(self):
       for root, dirs, files in os.walk('storage/'):
           for f in files:
               os.unlink(os.path.join(root, f))

if __name__ == '__main__':
    ## unittest.TextTestRunner(verbosity=2).main())
    unittest.main()