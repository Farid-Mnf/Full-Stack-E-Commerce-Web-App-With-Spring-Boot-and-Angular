import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <!-- Footer -->
    <footer class="footer py-4">
        <div class="container text-center">
            <p>Follow Us</p>
            <a href="#" class="text-white mx-2"><i class="fa-brands fa-facebook"></i></a>
            <a href="#" class="text-white mx-2"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" class="text-white mx-2"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="text-white mx-2"><i class="fa-brands fa-linkedin"></i></a>
        </div>
    </footer>

  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
