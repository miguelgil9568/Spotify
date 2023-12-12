import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthPageComponent} from './auth-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {By} from "@angular/platform-browser";
import * as mockRaw from '../../../../data/user.json'
import {AuthService} from "@modules/auth/services/auth.service";

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  let service: AuthService;
  let mockUser: any = (mockRaw as any).default;
  let httpClientSpy: [post: jasmine.Spy];

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      declarations: [AuthPageComponent]
    }).compileComponents();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClientSpy as any)

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


   it('Deben de retornar un objeto con "data" y session', () =>{
     const user: any = mockUser.userOk;
     httpClientSpy.post.and.returnValue()
  
     service.sendCredentials(user.email, user.password).subscribe( r=>{
  
     })
   })


  //TODO debe asegurar de que todo el formulario sea invalido cuando ingrese

  it('Deberia de retornar "invalido" el formulario', () => {
    const mockCredenciales = {
      email: '0x0x0x0x0x',
      password: '11111111111111111111111111111111'
    }
    const emailForm = component.formLogin.get('email')
    const passwordForm = component.formLogin.get('password')

    emailForm?.setValue(mockCredenciales.email)
    passwordForm?.setValue(mockCredenciales.password)


    expect(component.formLogin.invalid).toEqual(true);
  });

  //TODO debe asegurar de que todo el formulario sea invalido cuando ingrese
  it('Deberia de retornar "valido" el formulario', () => {
    const mockCredenciales = {
      email: '0x0x0x0x0x',
      password: '11111111111111111111111111111111'
    }
    const emailForm = component.formLogin.get('email')
    const passwordForm = component.formLogin.get('password')

    emailForm?.setValue(mockCredenciales.email)
    passwordForm?.setValue(mockCredenciales.password)


    expect(component.formLogin.valid).toEqual(false);
  });

  it('El boton deberia tener la palabra "iniciar sesion" ', () => {
    const elementRef = fixture.debugElement.query(By.css('.form-action button'))
    const getinnerText = elementRef.nativeElement.innerText

    expect(getinnerText).toEqual('Iniciar sesión')
  });


});
